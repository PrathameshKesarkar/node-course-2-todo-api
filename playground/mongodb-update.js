// const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    // db.collection('Todos')
    // .findOneAndUpdate({_id:new ObjectID("589a2760a73d4b0903fab66f")},{
    //   $set:{
    //     completed:true
    //   }
    // },{
    //   returnOriginal:false
    // })
    // .then((result)=>{
    //   console.log(result);
    // });


    db.collection('Users').findOneAndUpdate({_id:new ObjectID('5899b2446f48b839ea6895b8')},{
      $set:{
        name:'Prathamesh'
      },$inc:{
          age:1
      }
    },{
      returnOriginal:false
    }).then((result)=>{
      console.log(JSON.stringify(result,undefined,2));
    })
});
