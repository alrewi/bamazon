var inquirer = require('inquirer');

function displayItems () {
    //console.log ids, items and prices from products DB
};

displayItems();

inquirer.prompt([

  {
    type: "list",
    name: "whichProduct",
    message: "Which succulent would you like to take home today?",
    choices: ["1 (Burro's Tail)", "2 (Crown of Thorns)", "3 (Jade Plant)", "4 (Flaming Katy)", "5 (Aloe Vera)", "6 (Panda Plant)", "7 (Pincushion Cactus)", "8 (Roseum)", "9 (Snake Plant)", "10 (Zebra Plant)",]
  },

  {
    type: "input",
    name: "numOfProducts",
    message: "How many succulents would like?"
  }

]).then(function() {

  //If there is sufficient stock to fill the order,
  //Fill the order--
  //Decrement the stock in the DB
  //Show the customer the price of their order

  //If not, console.log ("We don't have the plants to fill that order! Try again, please.")
 });