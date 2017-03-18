const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc!';

// bcrypt.genSalt(10,(err,salt)=>{
//   bcrypt.hash(password,salt,(err,hash)=>{
//     console.log('HASH:',hash);
//   });
// });

var hashedPassword = '$2a$10$FccZRh.wa4KmEPBiXtnj4.Y2AunTGz9WJM3gNjKkBN0IH2Zcyyag.';

bcrypt.compare('123!',hashedPassword,(err,res)=>{
  console.log(res);
})
// var data = {
//   id:10
// };
//
//
// var token = jwt.sign(data,'123abc');
// console.log(token);
//
// var decode =  jwt.verify(token,'123abc');
//
// console.log('decoded',decode);
//

// var message = "I am user number 3";
// var hash = SHA256(message).toString();
//
// console.log('Message:',message);
// console.log('Hash:',hash);
