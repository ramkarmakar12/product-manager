# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Components of this project

Homepage - with add product button that appends a product input box on clicking on that opens a Modal

Modal/DialogueBox - A Modal that fetches the products from tha api with the variants and renders the products in the Modal with select option from product or from variant - prices are listed under each variant as pieces are not available in the api.

        seachBar - Implemented a searchBar that filtes from the products by entering the product name and can select the product or variant

        Add/Cancel - On clicking on add returns to homepage with selected products. On clicking on cancel or X on top closes the modal and returns to the homepage with no product selected. 

Product with variant - Upon selecting the product or variant from the modal it is shown in the homepage with the variant options and a toggle to show/hide vairants that concurrently changes the visibility (On product with only one variant it won't show)   

Add product - On clicking on add product button discount can be added as % or fixed discount.

## Available Scripts

In the project directory, you can run:

### `npm install`

Runs to install all the dependencies needed to compile

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Deployment

This project is hosted on Vercel : https://product-manager-mwyffue04-ramkarmakar12s-projects.vercel.app/

and Netlify : https://product-manager-monkcommerce.netlify.app/

e.g - Note that some functionality may not work in the deployed environemnt but be informed that the given functionalities has been implemented properly and matched designed from given figma file.
