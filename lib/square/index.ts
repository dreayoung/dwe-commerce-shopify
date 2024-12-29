import { Client, Environment } from 'square';

const squareClient = new Client({
  accessToken: process.env.NEXT_PRODUCTION_ACCESS_TOKEN,
  environment: Environment.Production
});

export default squareClient;
