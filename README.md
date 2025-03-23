# Tax Calculator

This is a simple tax calculator built using React. It allows users to input their annual income and calculate their owed taxes for a given year.

## Installation

1. Navigate to the project directory:
   ```sh
   cd tax-calculator
   ```
2. Install dependencies:

   ```sh
   yarn install
   ```

## Build

To create a production build, run:

```sh
yarn build
```

## Usage

1. Start the development server:
   ```sh
   yarn start
   ```
2. Open your browser and go to `http://localhost:5173/`
3. Enter your income and select the desired year
4. Click the `Calculate Taxes` button

## How to test

1. Install Playwright

   ```sh
   yarn playwright install
   ```

2. Start Your App

   In one terminal, start the React app:

   ```sh
   yarn start
   ```

3. Run Tests

   In another terminal, run Playwright tests:

   ```sh
   yarn test
   ```

## Technologies Used

- [React](https://react.dev/)
- [Vite](https://vite.dev/)
- [Playwright](https://playwright.dev/)
- JavaScript
- CSS
