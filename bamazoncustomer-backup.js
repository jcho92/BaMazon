var mysql = require('mysql');
var inquirer = require('inquirer')

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'Jadsf1234!@#$',
    database: 'bmazon_db'
});

var data = "SELECT *FROM products"
connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
});

connection.query(data, function (error, results, fields) {
    if (error) throw error;

    display(results)
})

function display(results) {
    var inventory = []

    for (i = 0; i < results.length; i++) {
        inventory.push(results[i].item_id + ". " + results[i].product_name)
    }
    console.table(inventory)
    inquirer.prompt([
        {
            name: "product_id",
            message: "What is the product ID you would like?",
            validate: function (value) {
                if (isNaN(value) == false && parseInt(value) > 0) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            name:"quantity",
            message:"how many would you like to buy?",
            validate: function (value) {
                if (isNaN(value) == false && parseInt(value) > 0) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    ]).then(function (answers) {
         var search = "SELECT * FROM bmazon_db.products WHERE item_id ="
        connection.query(search + answers.product_id, function (error, results, fields) {
            if (error) throw error;
            var available = results[0].stock - answers.quantity
            if (available > 0) {
                console.log("You're in luck we have that in stock")
                purchase(results ,answers.quantity)
            } else {
                console.log("insufficient quantity")
            }

        })
    })
}


function purchase(results , quantity) {
    var purchaseNumber = parseInt(quantity)
    var remainingStock = '(stock - ' + purchaseNumber + ')'
    var update = "UPDATE bmazon_db.products SET stock = (stock - ?) WHERE item_id = " + results[0].item_id
    connection.query(update, purchaseNumber, function (error, success, fields) {
        if (error) throw error;
        log(results, purchaseNumber) 
    })
   
}

function log(results, amount){
    console.log('your total is ' + results[0].price * amount)
    return process.exit(22);

}