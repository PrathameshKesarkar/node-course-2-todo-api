// const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    //Insert User Data
    // db.collection('Users').insertOne({
    //   name:"Chuck",
    //   age:21,
    //   location:"NYC"
    // },(err,result)=>{
    //   if(err){
    //     return console.log("Something went wrong");
    //   }
    //   console.log(result.ops[0]._id.getTimestamp());
    // })


    db.close();
});
