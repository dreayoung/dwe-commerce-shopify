import { Client, Environment } from 'square';

const squareClient = new Client({
  accessToken: process.env.NEXT_PRODUCTION_ACCESS_TOKEN,
  environment: Environment.Production
});

async function retryWithBackoff(requestFn: any, maxRetries = 3, initialDelay = 100) {
  let retries = 0;
  let delay = initialDelay;

  while (retries < maxRetries) {
    try {
      const response = await requestFn();
      return response;
    } catch (error) {
      if (error.statusCode === 429) {
        retries++;
        delay = Math.min(delay * 2, 10000); // Cap delay at 10 seconds
        const jitter = Math.random() * delay * 0.2; // Add jitter (20% of delay)
        await new Promise((resolve) => setTimeout(resolve, delay + jitter));
      } else {
        throw error;
      }
    }
  }

  throw new Error(`Max retries exceeded for request`);
}

export { squareClient, retryWithBackoff };
