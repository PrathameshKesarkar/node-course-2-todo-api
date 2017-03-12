var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todos');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT||3000;

app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
  var todo = new Todo({
    text:req.body.text

  });

  todo.save().then((doc)=>{
    res.send(doc);

  },(error)=>{
    res.status(400).send(error);
  });

});

// GET /todos/12345
app.get('/todos/:id',(req,res)=>{
  const {id} = req.params;
  if(!ObjectID.isValid(id)){
    return res.status(500).send('Invalid todo Id');
  }
  Todo.findById(id).then((todo)=>{
    if(!todo){
    return  res.status(404).send('No such Todo found');
    }
    res.status(200).send({todo});
  },(err)=>res.status(400).send());

});

app.get('/todos',(req,res)=>{
//Getting the the value passed as a query eg : /todos?name=prathamesh
//  reqQuery = req.query
  Todo.find().then((todos)=>{
    res.send({todos});
  },(err)=>{
    res.status(400).send(err);
  });
});

app.listen(port,()=>{
  console.log(`App is Started on port ${port}`);
})

module.exports ={app};
