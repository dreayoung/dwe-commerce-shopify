import { Client, Environment } from 'square';

const squareClient = new Client({
  accessToken: process.env.NEXT_PRODUCTION_ACCESS_TOKEN,
  environment: Environment.Production
});

export async function createSubCustomer(emailAddress: string) {
  const response = await squareClient.customersApi.createCustomer({
    emailAddress
  });

  return response.result.customer;
}

export async function checkCustomer(emailAddress: string) {
  const response = await squareClient.customersApi.searchCustomers({
    query: {
      filter: {
        emailAddress: {
          exact: emailAddress
        }
      }
    }
  });

  return response.result.customers;
}
