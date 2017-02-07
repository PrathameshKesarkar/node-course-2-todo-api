// const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    //Delet Many
    // db.collection('Todos').deleteMany({text:'Eat lunch'}).then((result)=>{
    //   console.log(result);
    // });

    //Delete One
    // db.collection('Todos')
    // .deleteOne({text:'Eat lunch'})
    // .then((result)=>{
    //   console.log(result);
    // });

    //find one and delete
    // db.collection('Todos')
    // .findOneAndDelete({completed:false})
    // .then((docs)=>{
    //   console.log(docs);
    // })

    //db.close();

    //User Table deletion
    // db.collection('Users')
    // .deleteMany({name:'Yash'})
    // .then((result)=>{
    //   console.log(result);
    // });
    //
    db.collection('Users')
    .findOneAndDelete({_id:new ObjectID("5899bd11501a6d3bb74e4c03")})
    .then((docs)=>{
      console.log(docs);
    });
});
