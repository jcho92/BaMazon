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

inquirer.prompt([
    {
        message: "who is this?",
        name: "name"
    }
]).then(function (answers) {
    console.log("Welcome " + answers.name)
    supervisor()
})


function supervisor() {
    var data = "SELECT SUM(product_sales) FROM products WHERE products.department_name = 'video games';";
    connection.query(data, function (error, results, fields) {
        if (error) throw error;
        console.table(results)
    })
}
