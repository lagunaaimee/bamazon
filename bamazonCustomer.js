var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Eclipse03!",
  database: "bamazon_db"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  console.log("-Connected-")
  // run the start function after the connection is made to prompt the user
  start();
});

// function which prompts the user for what action they should take
function start() {
  inquirer
    .prompt({
      name: "initial",
      type: "rawlist",
      message: "Would you like to purchase an item?",
      choices: ["Yes", "No"]
    })
    .then(function (answer) {
      if (answer.initial.toUpperCase() === "YES") {
        findItem();
      }
      else {
        console.log("Good-bye!");
      }
    });
}

function findItem() {
  connection.query("SELECT * FROM products", function (err, results) {
    if (err) throw err;
    console.log(results);
    inquirer.prompt([
      {
        name: "choice",
        type: "rawlist",
        choices: function () {
          var choices = [];
          for (var i = 0; i < results.length; i++) {
            choices.push(results[i].product_name);
          }
          return choices;
        },
        message: "What is the item_id of the product you'd like to purchase?"
      },
      {
        name: "quantity",
        type: "input",
        message: "How many units would you like?",
        validate: function(value){
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
    ])
    .then(function (answer) {
      // get the information of the chosen item
      var chosenItem;
      for (var i = 0; i < results.length; i++) {
        if (results[i].stock_quantity === answer.quantity) {
          chosenItem = results[i];
        }
      }
      if (chosenItem < parseInt(results.stock_quantity)) {
        connection.query(
          "UPDATE products SET ? WHERE ?",
          [
            {
              stock_quantity: answer.quantity
            },
            {
              item_id: chosenItem.item_id
            }
          ],
          function (error) {
            if (error) throw err;
            console.log("You've purchased " + answer.quantity + findItem.chosenItem);
            start();
          }
        )
      }
      else {
        console.log("Insufficient quantity!");
        start();
      }
    })
  })
}
