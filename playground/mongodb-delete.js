// const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    /**
    *delete many
    **/

    // db.collection('Todos').deleteMany({text:"Eat lunch"}).then((result)=>{
    //   console.log(result);
    // },(err)=>{
    //
    // });

    /**
    *Delete One item at a time
    **/
    //
    // db.collection('Todos').deleteOne({text:"Eat lunch"}).then((result)=>{
    //   console.log(result);
    // })

    // //Find one and delete
    // db.collection('Todos').findOneAndDelete({completed:false}).then((result)=>{
    //   console.log(result);
    // });

    // db.collection("Users").deleteMany({name:"Prathamesh"}).then((result)=>{
    //   console.log(result);
    // },(error)=>{});

    db.collection("Users").findOneAndDelete({_id: new ObjectID('58b683b53b735608b701199d')}).then((result)=>{
      console.log(result);
    },(err)=>{

    });

  //  db.close();
});
