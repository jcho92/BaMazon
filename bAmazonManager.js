var mysql = require('mysql');
var inquirer = require('inquirer')

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'Jadsf1234!@#$',
    database: 'bmazon_db'
});
connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
});


function manager() {
    inquirer.prompt([
        {
            message: "what would you like to do today",
            type: "list",
            name: "management",
            choices: ['view Products for Sale', 'View Low Inventory', 'Add to inventory', 'Add New Product']
        }
    ]).then(function (results) {
        var answers = results.management
        if (answers == 'view Products for Sale') {
            viewProducts();
        }
        else if (answers == 'View Low Inventory') {
            lowInventory();
        }
        else if (answers == 'Add to inventory') {
            addInventory();
        }
        else if (answers == 'Add New Product') {
            addProduct()
        }
    })
}
manager()

function viewProducts() {
    var search = "SELECT *FROM products"
    connection.query(search, function (error, results, fields) {
        if (error) throw error;
        console.table(results)

    })
}

function lowInventory() {
    var search = "SELECT * FROM products;"
    connection.query(search, function (error, results, fields) {
        if (error) throw error;

        for (i = 0; i < results.length; i++) {
            if (results[i].stock < 100) {
                console.log('------------------------------------------------------------------')
                console.table(results[i])
                // console.table(results[i].stock)
                console.log('------------------------------------------------------------------')
            }
        }
    })
}

function addInventory() {
    var inventoryList = []
    var search = "SELECT * FROM products;"
    connection.query(search, function (error, results, fields) {
        if (error) throw error;

        for (i = 0; i < results.length; i++) {
            inventoryList.push(results[i].product_name)
        }
        console.log(inventoryList)
        inquirer.prompt([
            {
                message: "what product would you like to add to",
                type: "list",
                choices: inventoryList,
                name: "inventory"

            }
        ]).then(function (answers) {
            var search = "SELECT * FROM products WHERE product_name = '" + answers.inventory + "'"
            connection.query(search, function (error, results, fields) {
                if (error) throw error;
                console.log('you have ' + results[0].stock + ' in stock')
                inquirer.prompt([
                    {
                        message: "how many would you like to add",
                        name: "amount",
                        validate: function (value) {
                            if (isNaN(value) === false) { return true; }
                            else { return false; }
                        }
                    }
                ]).then(function (answers2) {
                    var search = "UPDATE products SET stock = (stock +" + answers2.amount + ") WHERE product_name =" + "'" + answers.inventory + "'";
                    connection.query(search, function (error, success, fields) {
                        if (error) throw error;
                        console.log('success')
                    })
                })
            })
        })
    })


}

function addProduct() {
    inquirer.prompt([
        {
            message: "name of item",
            name: "product_name"
        },
        {
            message: "department of item",
            name: "department_name"
        },
        {
            message: "price of item",
            name: "price",
            validate: function (value) {
                if (isNaN(value) === false) { return true; }
                else { return false; }
            }
        },
        {
            message: "how many units of item",
            name: "stock",
            validate: function (value) {
                if (isNaN(value) === false) { return true; }
                else { return false; }
            }
        }
    ]).then(function (answers) {

        console.log(answers.product_name)
        var update = 'INSERT INTO bmazon_db.products ( product_name, department_name, price, stock, product_sales) VALUES ("' + answers.product_name + '","' + answers.department_name + '","' + answers.price + '","' + answers.stock + '","' + '0");'
       
        connection.query(update, function (error, success, fields) {
            if (error) throw error;
            console.log('success! Your new product has been added')
        })
    })
}