const {ObjectID} = require('mongodb');
const {Todo} = require('./../../models/todos');
const {User} = require('./../../models/user');

const jwt = require('jsonwebtoken');

var userOneObjectID = new ObjectID();
var userTwoObjectID = new ObjectID();

const users = [{
  _id:userOneObjectID,
  email:'andrew@example.com',
  password:'test123',
  tokens:[{
    access:'auth',
    token: jwt.sign({_id:userOneObjectID ,access:'auth'},'abc123').toString()
  }]
},{
  _id:userTwoObjectID,
  email:'jenny@example.com',
  password:'test789',
  // tokens:[{
  //     access:'auth',
  //     token:jwt.sign({_id:userTwoObjectID ,access:'auth'},'abc123').toString()
  // }]
}]

const todos =[{
  _id:new ObjectID(),
  text:'First Test todo'
},{
  _id:new ObjectID(),
  text:'Second Test todo',
  completed:true
}];

const populateTodos = (done)=>{
  Todo.remove({}).then(()=>{
    return Todo.insertMany(todos);
  }).then(()=> done());
};

const populateUsers = (done)=>{
  User.remove({}).then(()=>{
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();

    return Promise.all([userOne,userTwo])
  }).then(()=>done());
}

module.exports = {todos,populateTodos,users,populateUsers};
