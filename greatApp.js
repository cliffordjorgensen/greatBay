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
    inquirer.prompt([{
        type: 'list',
        message: '\n\tWhat would you like to choose?\n\n',
        choices: ["\tPOST AN ITEM", "\tBID ON AN ITEM"],
        name: "menu"
    }]).then(function(response) {
        if (response.menu === '\tPOST AN ITEM') {
            inquirer.prompt([{
                type: "list",
                message: "What would you like to sell?",
                choices: ["Items", "Tasks", "Jobs", "Projects"],
                name: "postMenu"
            }]).then(function(response) {
                newItem = [];
                newTask = [];
                newJobs = [];
                newProj = [];
                if (response.postMenu === "Items") {
                    newItem.push(response.postMenu)
                    inquirer.prompt([{
                        type: 'input',
                        message: 'please enter the product name',
                        name: 'Items'
                    }]).then(function(response) {
                        newItem.push(response.Items)
                        inquirer.prompt([{
                            type: "list",
                            message: "Please select the quantity",
                            choices: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                            name: "quantity"
                        }]).then(function(response) {
                            newItem.push(response.quantity);
                            createProduct(newItem[0], newItem[1], newItem[2]);
                            console.log(newItem);
                        });
                    });
                } else if (response.postMenu === "Tasks") {
                    newTask.push(response.postMenu);
                    inquirer.prompt([{
                        type: 'input',
                        message: 'Please enter the Task name',
                        name: 'Tasks'
                    }]).then(function(response) {
                        newTask.push(response.Tasks)
                        inquirer.prompt([{
                            type: "list",
                            message: "Please select the quantity of tasks",
                            choices: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                            name: "quantity"
                        }]).then(function(response) {
                            newTask.push(response.quantity);
                            createProduct(newTask[0], newTask[1], newTask[2]);
                            console.log(newTask);
                        });
                    });

                } else if (response.postMenu === "Jobs") {
                    newJobs.push(response.postMenu)
                    inquirer.prompt([{
                        type: 'input',
                        message: 'Please enter the Job name',
                        name: 'Jobs'
                    }]).then(function(response) {
                        newJobs.push(response.Jobs)
                        inquirer.prompt([{
                            type: "list",
                            message: "Please select the quantity of Jobs",
                            choices: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                            name: "quantity"
                        }]).then(function(response) {
                            newJobs.push(response.quantity);
                            createProduct(newJobs[0], newJobs[1], newJobs[2]);
                            console.log(newJobs);
                        });
                    });

                } else if (response.postMenu === "Projects") {
                    newProj.push(response.postMenu)
                    inquirer.prompt([{
                        type: 'input',
                        message: 'Please enter the Project name',
                        name: 'Projects'
                    }]).then(function(response) {
                        newProj.push(response.Projects)
                        inquirer.prompt([{
                            type: "list",
                            message: "Please select the quantity of Projects",
                            choices: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                            name: "quantity"
                        }]).then(function(response) {
                            newProj.push(response.quantity);
                            createProduct(newProj[0], newProj[1], newProj[2]);
                            console.log(newProj);
                        });
                    });
                }
            });
        } else if (response.menu === "\tBID ON AN ITEM") {
            inquirer.prompt([{
                type: "input",
                message: "Enter the name of the item you would like to bid on",
                name: "productBid"
            }]).then(function(response) {
                var itemToBid = response.productBid
                readProducts(itemToBid);
            })
        };
    });

    function createProduct(type, name, quantity) {
        console.log("\n\tInserting a new product...\n");
        connection.query(
            "INSERT INTO Great_Bay SET ?", {
                type,
                name,
                quantity
            },
            function(err, res) {
                if (err) throw err;
                console.log(res.affectedRows + "\n\tProduct inserted!\n");
            })
    };

    function readProducts(string) {
        connection.query("SELECT * FROM Great_Bay", function(err, res) {
            if (err) throw err;

            for (let i = 0; i < res.length; i++) {
                if (res[i].name === string) {
                    console.log('\n\t', res[i].name);
                } else { console.log("\n\tItem unavailable\n") }
            }
            connection.end();
        });
    };



    // function bidderFunc(type, name, quantity) {
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

    function deleteProduct() {
        console.log("Deleting all strawberry icecream...\n");
        connection.query(
            "DELETE FROM products WHERE ?", {
                flavor: "strawberry"
            },
            function(err, res) {
                console.log(res.affectedRows + " products deleted!\n");
                // Call readProducts AFTER the DELETE completes
                readProducts();
            }
        );
    }


}