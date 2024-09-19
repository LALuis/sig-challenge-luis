# Code challenge

## Objective 
For this project, we'd like you to build a simple product dashboard using Angular.

We anticipate that you should be able to complete this within 4 hours.

We've provided a simple [mock backend](#backend-server) with a few endpoints, and you should be able to use these to read and update data.

Keep the styles simple and maintainable for now, as we won't be assessing your project on visual design. Just focus on layout, hierarchy, and basic accessibility, while being functional and consistent.

## Requirements

- DONE: Create a basic Angular application with two main components: `ProductListComponent` and `ProductDetailComponent`.
- The `ProductListComponent` should display a grid of products. The list should display 4 products per row on desktop, or one product per row on small screens.
- DONE: There should be a ui control to filter by category. It should display all the available categories based on the list of products. Selecting one of the categories on the list should filter the list of products by that category.
- DONE: The list should display the product's name, price and category.
- DONE: Use different routes for the product list and the product detail pages.
- DONE: Clicking on a product should navigate to the `ProductDetailComponent`, which displays more detailed information about the selected product.
- DONE: `ProductDetailComponent` should display the product image at the top - DONE, followed by the product name - DONE, category - DONE, description - DONE, and price. The product price must show as US dollars - DONE. 
- DONE: The category should be displayed similar to [angular material basic chip](https://material.angular.io/components/chips/overview#chips-overview). You shouldn't use angular material for this, but rather recreate something visually similar.
- DONE: Implement a simple form in the `ProductDetailComponent` that allows a user to edit a product's name and price. Add a control to toggle between editing or viewing a product's details.
- DONE: Use Angular services to handle data retrieval and updates.


#### Backend server
There is a small express script in the `/backend` directory of this project. It will provide a very simple backend for your project.

To install dependencies: 
`npm install` under the `/backend` directory 

To run the backend:
`npm run start`under the `/backend` directory

This should launch a backend server with the following endpoints:

- GET `http://localhost:3000/products/{:productId}`  - to get a specific product by id

- GET `http://localhost:3000/products` - to get a list of products.

- POST `http://localhost:3000/products/{:productId}` - this will update a record in-memory when given a body of raw JSON.
Note that this is just provided as an example, none of this data is actually written to a file or a database. If the server is restarted for any reason, any changes to records will be lost.
