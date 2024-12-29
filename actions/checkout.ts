'use server';

import { squareClient } from 'lib/square';

export async function generatePaymentLink(lineItems: any[], idempotencyKey: any) {
  try {
    const response = await squareClient.checkoutApi.createPaymentLink({
      idempotencyKey,
      order: {
        locationId: process.env.NEXT_SQUARE_LOCATION_ID!,
        lineItems: lineItems.map((item: any) => ({
          quantity: item.quantity.toString(),
          catalogObjectId: item.catalogObjectId
        }))
      },
      checkoutOptions: {
        allowTipping: false,
        redirectUrl: 'https://www.herotoall.com/thankyou?=order.placed',
        askForShippingAddress: true,
        acceptedPaymentMethods: {
          applePay: true,
          googlePay: true,
          cashAppPay: true,
          afterpayClearpay: true
        },
        enableCoupon: true
      }
    });

    if (response.result.paymentLink?.url) {
      return { checkoutUrl: response.result.paymentLink.url };
    } else {
      throw new Error('Failed to create checkout link');
    }
  } catch (error) {
    console.error('Error creating checkout link:', error);
    return {
      error: 'Failed to create checkout link',
      status: 500
    };
  }
}
