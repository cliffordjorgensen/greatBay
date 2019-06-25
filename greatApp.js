var inquirer = require('inquirer');
var mysql = require("mysql");
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
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
            message: '\n\tWhat would you like to choose?\n\n',
            choices: ["\tPOST AN ITEM", "\tBID ON AN ITEM"],
            name: "menu"
        }]).then(function(response) {
            if (response.menu === '\tPOST AN ITEM') {
                inquirer
                    .prompt([{
                        type: 'input',
                        message: 'please enter the product name',
                        name: 'name'
                    }]).then(function(response) {
                        finalProduct.push(response.name)
                        inquirer
                            .prompt([{
                                type: "list",
                                message: "Please select the quantity",
                                choices: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                                name: "quantity"
                            }]).then(function(response) {
                                finalProduct.push(response.quantity);
                                createProduct(finalProduct[0], finalProduct[1]);
                                console.log(finalProduct);
                            });
                    })
            } else if (response.menu === "\tBID ON AN ITEM") {
                inquirer.prompt([{
                    type: "input",
                    message: "Enter the name of the item you would like to bid on",
                    name: "productBid"
                }]).then(function(response) {
                    var itemToBid = response.productBid
                    connection.query("SELECT * FROM product", function(err, res) {
                        if (err) throw err;
                        for (let i = 0; i < res.length; i++) {
                            if (res[i].name === itemToBid) {
                                console.log(res[i].name);
                            } else { console.log("Item unavailable") }
                        }
                        connection.end();
                    });
                })
            };
        });

    function createProduct(name, quantity) {
        console.log("Inserting a new product...\n");
        connection.query(
            "INSERT INTO product SET ?", {
                name,
                quantity
            },
            function(err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " product inserted!\n");
            })
    };

    // function bidderFunc(name, quantity) {
    //     console.log
    // }

    // function updateProduct() {
    //     console.log("Updating all Rocky Road quantities...\n");
    //     var query = connection.query(
    //         "UPDATE products SET ? WHERE ?", [{ quantity: 100 }, { flavor: "Rocky Road" }],
    //         function(err, res) {
    //             console.log(res.affectedRows + " products updated!\n");
    //             // Call deleteProduct AFTER the UPDATE completes
    //             deleteProduct();
    //         }
    //     );
    //     // logs the actual query being run
    //     console.log(query.sql);
    // }

    // function deleteProduct() {
    //     console.log("Deleting all strawberry icecream...\n");
    //     connection.query(
    //         "DELETE FROM products WHERE ?", {
    //             flavor: "strawberry"
    //         },
    //         function(err, res) {
    //             console.log(res.affectedRows + " products deleted!\n");
    //             // Call readProducts AFTER the DELETE completes
    //             readProducts();
    //         }
    //     );
    // }


}