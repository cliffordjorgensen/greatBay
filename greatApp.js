var inquirer = require('inquirer');
var mysql = require("mysql");
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "AT&ppqs2",
    database: "greatBay_DB"
});
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    main();
})


const main = function() {
    finalProduct = [];
    inquirer
        .prompt([{
            type: 'list',
            message: 'what would you like to choose',
            choices: ["POST AN ITEM", "BID ON AN ITEM"],
            name: "menu"
        }]).then(function(res) {
            if (res.menu === 'POST AN ITEM') {
                inquirer
                    .prompt([{
                        type: 'input',
                        message: 'please enter the product name',
                        name: 'name'
                    }]).then(function(res) {
                        finalProduct.push(res.name)
                        inquirer
                            .prompt([{
                                type: "list",
                                message: "Please select the quantity",
                                choices: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                                name: "quantity"
                            }]).then(function(res) {
                                finalProduct.push(res.quantity);
                                
                                createProduct(finalProduct[0],finalProduct[1]);
                                console.log(finalProduct);

                            });

                    })


            };
        });

    function createProduct(name, quantity) {
        console.log(name, quantity)
        console.log("Inserting a new product...\n");
        connection.query(
            "INSERT INTO product SET ?", {
                name,
                quantity
            },
            function(err, res) {
                if(err) throw err;
                console.log(res.affectedRows + " product inserted!\n");
                // Call updateProduct AFTER the INSERT completes
                // updateProduct();
            })

    };




}