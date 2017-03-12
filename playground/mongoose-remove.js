const {ObjectID}=require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todos');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result)=>console.log(result));

Todo.findByIdAndRemove('58c5289dc45f3f727abe7adb').then((result)=>console.log(result));
