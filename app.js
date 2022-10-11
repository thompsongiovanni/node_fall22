var express = require('express');
var mongoose = require('mongoose')
var app = express();


app.use('/static', express.static("public"));
app.use(express.urlencoded({ extended: true}))
app.set("view engine", "ejs");
const Todo = require('./models/todo.model');
const mongoDB = 'mongodb+srv://thompson_giovanni:Trillchains12345!!!@cluster0.ktpcdic.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, "MongoDB Connection Error:"))


app.get('/', function(req, res){
    res.render('todo.ejs');
})

app.post('/', (req, res) => {
    let newTodo = new Todo({
        todo: req.body.content,
        done: false
    })
    newTodo.save(function(err, todo){
        if(err){
            res.json({"Error: ": err})
        } else {
            res.json({"Status: ": "Successful", "ObjectId": todo.id})
        }
    })
})

app.listen(3000, function(){
    console.log('App listening on port 3000')
})