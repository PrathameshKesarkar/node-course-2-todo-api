const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
  id:10
};


var token = jwt.sign(data,'123abc');
console.log(token);

var decode =  jwt.verify(token,'123abc');

console.log('decoded',decode);


// var message = "I am user number 3";
// var hash = SHA256(message).toString();
//
// console.log('Message:',message);
// console.log('Hash:',hash);
