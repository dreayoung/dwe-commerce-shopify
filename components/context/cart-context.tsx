'use client';

import { CartContextType, CartItem } from '@types';
import { generatePaymentLink } from 'actions/checkout';
import { useState, useEffect, createContext, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [bagOpen, setBagOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // console.log('CART --------', cart)

  const addToCart = (selected: CartItem) => {
    if (!selected.catalogObjectId) return;

    setCart((prevCart: any) => {
      const existingItem = prevCart.find(
        (i: any) => i.catalogObjectId === selected.catalogObjectId
      );
      if (existingItem) {
        return prevCart.map((i: any) =>
          i.catalogObjectId === selected.catalogObjectId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevCart, selected];
    });

    // setBagOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.catalogObjectId !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const handleCheckout = async () => {
    try {
      setLoading(true);
      const uuid = uuidv4();
      const data = await generatePaymentLink(cart, uuid);

      if (data.checkoutUrl) {
        // Clear the cart before redirecting
        clearCart();

        // Redirect to the Square checkout page
        window.location.href = data.checkoutUrl;
        // setCheckoutUrl(data.checkoutUrl);
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('There was an error processing your checkout. Please try again.');
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        bagOpen,
        setBagOpen,
        handleCheckout,
        loading
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
