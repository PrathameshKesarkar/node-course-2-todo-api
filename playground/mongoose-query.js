const {ObjectID}=require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todos');
const {User} = require('./../server/models/user');

var id = "58bc30c88491665618e7f150";

// if(!ObjectID.isValid(id)){
//   console.log('Id not valid');
// }

// Todo.find({_id:id}).then((docs)=>console.log(docs),(err)=>{
//   console.log(err);
// });
//
// Todo.findOne({_id:id}).then((docs)=>console.log(docs),(err)=>{
//   console.log(err);
// });

// Todo.findById(id).then((docs)=>{
//   if(!docs){
//     return console.log('No such Todo Found')
//   }
//   console.log(docs);
// }).catch((error)=>{
//   console.log(error);
// });

User.findById(id).then((user)=>{
  if(!user){
    return  console.log('No such user found');
  }
  console.log(user);
}).catch((error)=>console.log(error));
