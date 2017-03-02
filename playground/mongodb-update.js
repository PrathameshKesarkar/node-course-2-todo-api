// const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');


//  Update the Todos completed status
    // db.collection('Todos').findOneAndUpdate({
    //   _id:new ObjectID("58b8865d485f00cc27082c99")
    //   },{
    //     $set:{
    //       completed:true
    //     }
    //   },{
    //     returnOriginal:false
    // })
    // .then((result)=>{
    //     console.log(result);
    //   },(err)=>{
    //     console.log(err);
    // });

//Update the Users name and increment its age
db.collection('Users').findOneAndUpdate({
  _id:123
},{
  $set:{
    name:'Prathamesh'
  },
  $inc:{
    age:1
  }
},{
  returnOriginal:false
}).then((result)=>{
  console.log(JSON.stringify(result,undefined,2));
},(err)=>{
  console.log(err);
});

    db.close();
});
