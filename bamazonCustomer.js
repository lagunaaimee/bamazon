var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
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

// function buyItem() {
//   inquirer.prompt([{
//     name: "item",
//     type: "input",
//     message: "Which item are you interested in purchasing?"
//   },
//   ])
// }

function findItem() {
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    inquirer.prompt([
      {
        name: "choice",
        type: "rawlist",
        choices: function(){
          var choices = [];
          for (var i=0; i < results.length; i++) {
            choices.push(results[i].product_name);
          }
          return choices;
        },
        message: "Which item would you like to purchase?"
      },
    ])
  }
)
}