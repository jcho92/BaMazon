Bamazon is a app created to manage a store's inventory and to take in customer orders

How it works 
-------------------------------------------------------------------------------

bamazonCustomer.js
-------------------------------------------------------------------------------
Running bamazonCustomer.js enables the point of view from the customer

The app will first display an overall available products that the user can choose via ID 

the user can then pick a product and buy the any quanitity they want of the product. If there is enough stock then the purchase will go through

If there is not enough quantity in stock then the console will return an error saying there is not enough in stock

if there is enough stock then the user has successfully purchased the product, the app will then return the total the user needs to pay and the stock will be updated with the new quantity available, this will also update the column product sale displaying how much profit this product is making


bAmazonManager.js
--------------------------------------------------------------------------------
Running bAmazonManager.js enables the point of view from the manager

the app will initially display all available options 

- view products for sales
- view low inventory
- add to inventory
- add new product

view products for sales
 displays all products available and all information about the product

view low inventory 
 queries the database and searches for all products that have an inventory quantity of 100 or less

 add to inventor

 this will prompt a whole new sets of inquiries that answers a set amount of questions which will be input the answers into the mysql database

add new product 
 this will prompt a whole new sets of inquiries that answers a set amount of questions which will be input the answers into the mysql database

bAmazonSupervisor.js
--------------------------------------------------------------------------------
Work in progress