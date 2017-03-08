const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo}= require('./../models/todos');

var todos =[{
  text:'First Test todo'
},{
  text:'Second Test todo'
}];

beforeEach((done)=>{
  Todo.remove().then(()=>{
    return Todo.insertMany(todos);
  }).then(()=> done());
})

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
