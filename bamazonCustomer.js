var inquirer = require('inquirer');
var mysql = require('mysql');
var Table = require('cli-table');

var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Welcome to Bamazon!");
  whatNext();
});

function whatNext() {
  inquirer.prompt([
    {
      type: "list",
      name: "wantToBuy",
      message: "Are you shopping for succulents with us today?",
      choices: ["I sure am!", "Not today."]
    }
  ]).then(function(answer) {
    if (answer.wantToBuy === "I sure am!") {
      console.log("Well, you've come to the right place! Here's what we have in stock today.")
      displayProducts();
    } else {
      console.log("Maybe next time! Y'all come back now, ya hear?");
      connection.end();
    }
  })
};

function displayProducts() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    var table = new Table({
      chars: {
        'top': '═', 'top-mid': '╤', 'top-left': '╔', 'top-right': '╗'
        , 'bottom': '═', 'bottom-mid': '╧', 'bottom-left': '╚', 'bottom-right': '╝'
        , 'left': '║', 'left-mid': '╟', 'mid': '─', 'mid-mid': '┼'
        , 'right': '║', 'right-mid': '╢', 'middle': '│'
      },
      head: ['ID','Name', 'Price']
    });
    for (var i = 0; i < res.length; i++) {
        table.push([res[i].id, res[i].name, '$' + res[i].price]);
    }
    console.log(table.toString());
    toBuy();
  });
};

function toBuy() {
  inquirer.prompt([
    {
      type: "input",
      name: "whichProduct",
      message: "Which succulent would you like to take home today? Enter it's ID below.",
    },
    {
      type: "input",
      name: "numOfProducts",
      message: "How many succulents would you like?"
    }
  ]).then(function(res) {
    // console.log(res);
    connection.query("SELECT * FROM products WHERE ?", 
      {
        id: res.whichProduct
      }, 
      function (err, response) {
        if (err) throw err;
        console.log(
`You chose the ${response[0].name}. Gorgeous!`);
        if (res.numOfProducts <= response[0].stock) {
          console.log("It's all yours!");
          var newStock = parseInt(response[0].stock) - parseInt(res.numOfProducts);
          var totalPrice = parseInt(response[0].price) * parseInt(res.numOfProducts);
          console.log("Your total today is $" + totalPrice + ".");
          updateStock(res.whichProduct, newStock);
        } else {
          console.log("We don't have the plants to fill that order, though! Try again, please.")
          whatNext();
        }
      }
    )
  })
};

function updateStock(id, stock) {
  connection.query(
    "UPDATE products SET ? WHERE ?",
    [{
        stock: stock
      },
      {
        id: id
      }],
    function(err, res) {
      deleteEmptyStock();
    }
  )
};

function deleteEmptyStock() {
  connection.query(
    "DELETE FROM products WHERE ?",
    {
      stock: 0
    },
    function(err, res) {
      whatNext();
    }
  );
};