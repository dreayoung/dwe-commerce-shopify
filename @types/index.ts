import { Dispatch, SetStateAction } from 'react';

export type ConnectForm = {
  email: string;
  name: string;
  message: string;
};

export type Customer = {
  id: string;
};

export type ProductOption = {
  id: string;
  name: string;
  values: {
    id: string;
    itemOptionValueData: {
      itemOptionId: string;
      name: string;
    };
  }[];
  type: string;
  version: any;
};

export type ProductVariant = {
  id: string;
  name: string;
  availableForSale: boolean;
  selectedOptions: {
    itemOptionId: string;
    itemOptionValueId: string;
  }[];
  price: number;
  quantity: number;
};

export type CartItem = {
  catalogObjectId: string | undefined;
  image: string;
  itemName: string | undefined;
  price: number;
  quantity: number;
  uid: string;
  variationName: string | undefined;
};

export type CartContextType = {
  cart: CartItem[];
  addToCart: (selected: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  checkoutUrl: string;
  bagOpen: boolean;
  setBagOpen: Dispatch<SetStateAction<boolean>>;
  handleCheckout: () => void;
  loading: boolean;
};
