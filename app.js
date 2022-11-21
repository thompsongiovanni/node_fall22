var express = require('express');
var axios = require('axios');
var app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/static', express.static("public"));
app.set("view engine", "ejs");


app.get('/', function(req, res){
    random = Math.floor(Math.random() * 2500) +1;

let imgURL = `https://xkcd.com/${random}/info.0.json`;
    axios.get(imgURL).then(function (response) {
        res.render('todo.ejs', { comicData: response.data });
    });
});   

app.listen(3000, function(){
    console.log('App listening on port 3000')
})