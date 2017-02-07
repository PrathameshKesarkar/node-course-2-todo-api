// const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    // db.collection('Todos').insertOne({
    //   text:'Something to do',
    //   completed:false
    // },(err,result)=>{
    //   if(err){
    //     return console.log('Unable to insert todo');
    //   }
    //   console.log(JSON.stringify(result.ops,undefined,2));
    // });

    // db.collection('Users').insertOne({
    //   name:'Yash',
    //   age:'15',
    //   location:'Mumbai'
    // },(err,result)=>{
    //   if(err){
    //     return console.log('Something bad happened');
    //   }
    //    console.log(JSON.stringify(result.ops,undefined,2));
    //    console.log(result.ops[0]._id.getTimestamp());
    // });

    db.close();
});
