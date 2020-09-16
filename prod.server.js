const { path } = require('d3');
const express = require('express');
const app = express();

var Todo = require('./Routes/Todo')

var http = require('http').Server(app);
var port = process.env.PORT||3000;

app.use(express.json());
app.use(express.static(path.join(__dirname,'/dist/')))
app.use('/',Todo);

http.listen(port, async ()=>{
  console.log(`Listen on :${port}`);
});