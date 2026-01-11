/** @type {import('prettier').Config} */
export default {
  singleQuote: true,
  arrowParens: 'always',
  trailingComma: 'none',
  printWidth: 100,
  tabWidth: 2,
  plugins: ['prettier-plugin-tailwindcss'],
  // This helps Bun/Prettier find the tailwind config if it's in a non-standard spot
  tailwindConfig: './tailwind.config.mjs'
};
