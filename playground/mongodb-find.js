// const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    // db.collection('Todos').find({
    //   _id:new ObjectID('5899bf92a73d4b0903faaf03')
    // }).toArray().then((docs)=>{
    //   console.log('Todos');
    //   console.log(JSON.stringify(docs,undefined,2));
    // },(err)=>{
    //   console.log('Unable to find todos',err);
    // });

    // db.collection('Todos').find().count().then((count)=>{
    //   console.log(`Todos count:${count}`);
    //
    // },(err)=>{
    //   console.log('Unable to find todos',err);
    // });

    db.collection('Users').find({name:'Yash'}).toArray().then((docs)=>{
      console.log(`Todos :${JSON.stringify(docs,undefined,2)}`);
    },(err)=>{
      console.log('Unable to find todos',err);
    });

    //db.close();
});
