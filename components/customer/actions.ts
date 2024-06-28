'use server';

import { createCustomer } from 'lib/shopify';

export async function addCustomer(email: string) {
  try {
    const res = await createCustomer(email);
    return res;
  } catch (e) {
    return {
      id: 'Error adding customer'
    };
  }
}
