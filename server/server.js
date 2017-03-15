require('./config/config');
var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
const _ = require('lodash');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todos');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT;

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

app.delete('/todos/:id',(req,res)=>{
  const {id} =req.params;
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id).then((todo)=>{
    if(!todo){
      return res.status(404).send();
    }
    return res.status(200).send({todo});
  }).catch((error)=>{
    res.status(400).send();
  });
});



app.patch('/todos/:id',(req,res)=>{
  const {id}= req.params;
  var body = _.pick(req.body,['text','completed']);

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  if(_.isBoolean(body.completed)&& body.completed){
      body.completedAt = new Date().getTime();
  }else{
      body.completed=false;
      body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id,{$set:body},{new:true}).then((todo)=>{
      if(!todo){
        return res.status(404).send();
      }

      res.send({todo});
  })
  .catch((err)=>{
    return res.status(400).send();
  });
});



app.post('/users',(req,res)=>{
  var body = _.pick(req.body,['email','password']);
  var user = new User(body);

  user.save().then(()=>{
    return user.generateAuthToken();
  })
  .then((token)=>{
     res.header('x-auth',token).send(user);
  })
  .catch((err)=>res.status(400).send(err));
});


app.listen(port,()=>{
  console.log(`App is Started on port ${port}`);
})

module.exports ={app};
