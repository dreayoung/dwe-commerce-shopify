'use server';

import { createSubCustomer, checkCustomer } from 'actions/customers';

export async function addCustomer(email: string) {
  try {
    const checkExisting = await checkCustomer(email);

    if (checkExisting?.[0]?.id) {
      return {
        id: 'Customer exists'
      };
    }

    const res = await createSubCustomer(email);
    return res;
  } catch (e) {
    return {
      id: 'Error adding customer'
    };
  }
}
