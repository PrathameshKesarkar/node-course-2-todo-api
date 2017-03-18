const expect = require('expect');
const request = require('supertest');
const {ObjectID}= require('mongodb');

const {app} = require('./../server');
const {Todo}= require('./../models/todos');
const {User} = require('./../models/user');
const {todos,populateTodos,users,populateUsers} = require('./seed/seed');

before(populateUsers);
beforeEach(populateTodos);

describe('POST /todos',()=>{
  it('should create a new todo',(done)=>{
    var text ='Test todo text'

    request(app)
    .post('/todos')
    .send({text})
    .expect(200)
    .expect((res)=>{
      expect(res.body.text).toBe(text);
    })
    .end((err,res)=>{
      if(err){
        return done(err);
      }

      Todo.find({text}).then((todos)=>{
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(text);
        done();
      }).catch((reject)=>done(reject));
    });
  });

  it('should not create a new todo cause of an empty body',(done)=>{
    request(app)
    .post('/todos')
    .send({})
    .expect(400)
    .end((err,res)=>{
       if(err){
         return done(err);
       }

      Todo.find().then((todos)=>{
        expect(todos.length).toBe(2);
        done();
      })
      .catch((err)=>done(err));
    });
  });
});

describe('GET /todos',(done)=>{
  it('should fetch all todos',()=>{
    request(app)
    .get('/todos')
    .expect(200)
    .expect((res)=>{
      expect(res.body.todos.length).toBe(2);
    })
    .end(done);
  });
});

describe('GET /todos/:id',()=>{
    it('should fetch single todo',(done)=>{
      request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res)=>{
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
    });

    it('should return a 404 if todo not found',(done)=>{
      request(app)
      .get(`/todos/${new ObjectID().toHexString()}`)
      .expect(404)
      .end(done);
    });

    it('should return a 404 for non-object ids',(done)=>{
      request(app)
      .get('/todos/123')
      .expect(500)
      .end(done);
    });
});


describe('DELETE /todos/:id',()=>{
  it('should delete single todo',(done)=>{
      var hexID = todos[1]._id.toHexString();

      request(app)
      .delete(`/todos/${hexID}`)
      .expect(200)
      .expect((res)=>{
        expect(res.body.todo._id).toBe(hexID);
      })
      .end((err,res)=>{
        if(err){
          return done(err);
        }
        Todo.findById(hexID).then((todo)=>{
          expect(todo).toNotExist();
          done();
        })
        .catch((err)=>done(err));
      });
  });


  it('should return 404 if todo not found',(done)=>{
        var hexID = new ObjectID();
        request(app)
        .delete(`/todos/${hexID}`)
        .expect(404)
        .end(done);
  });


  it('should return 404 is ObjectID is not valid',(done)=>{
    request(app)
    .get('/todos/123')
    .expect(500)
    .end(done);
  });
});

describe('PATCH /todos/:id',()=>{
  it('should update the todo',(done)=>{
    var hexID = todos[0]._id.toHexString();
    var resText = 'Hey There Beautiful';
    request(app)
    .patch(`/todos/${hexID}`)
    .send({
      text:resText,
      completed:true
    })
    .expect(200)
    .expect((res)=>{
      expect(res.body.todo.text).toBe(resText);
      expect(res.body.todo.completed).toBe(true);
      expect(res.body.todo.completedAt).toBeA('number');
    })
    .end(done);
  });

  it('should clear completedAt when completed is set to false',(done)=>{
    var hexID = todos[1]._id.toHexString();
    var changedText = 'You look gorgeous';
    request(app)
    .patch(`/todos/${hexID}`)
    .send({
      text: changedText,
      completed:false
    })
    .expect(200)
    .expect((res)=>{
      expect(res.body.todo.completed).toBe(false);
      expect(res.body.todo.text).toBe(changedText);
      expect(res.body.todo.completedAt).toNotExist();
    })
    .end(done);
  });
});

describe('GET /users/me',()=>{
  it('should return if authenticated',(done)=>{
      request(app)
      .get('/users/me')
      .set('x-auth',users[0].tokens[0].token)
      .expect(200)
      .expect((res)=>{
        expect(res.body._id).toBe(users[0]._id.toHexString());
        expect(res.body.email).toBe(users[0].email);
      })
      .end(done);
  });

  it('should return if not authenticated',(done)=>{

    request(app)
    .get('/users/me')
    .expect(401)
    .expect((res)=>{
      expect(res.body).toEqual({});
    })
    .end(done);
  });
});

describe('POST /users',()=>{
  it('should create user',(done)=>{
      var email = 'jon@example.com';
      var password = 'abc123';

      request(app)
      .post('/users')
      .send({email,password})
      .expect(200)
      .expect((res)=>{
        expect(res.headers['x-auth']).toExist();
        expect(res.body._id).toExist();
        expect(res.body.email).toBe(email);
      }).end((err)=>{
        if(err){
          return done(err);
        }
        User.findOne({email}).then((user)=>{
          expect(user).toExist();
          expect(user.password).toNotBe(password);
          done();
        });
      });
  });


  it('should return a validation error if request is invalid',(done)=>{
    var email='pratham.kesarkar';
    var password = '123';
      request(app)
        .post('/users')
        .send({email,password})
        .expect(400)
        .end(done);
  });

  it('should not create a user if the email is in use',(done)=>{

      request(app)
        .post('/users')
        .send({email:users[0].email,password:users[0].password})
        .expect(400)
        .end(done);

  });
});
