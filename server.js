const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.dev.js');
const compiler = webpack(config);
var http = require('http').Server(app);
var port = process.env.PORT||3000;

app.use(express.json());

var TODO=[];
var GetIndexFromID=(id)=>{
  return TODO.findIndex((value)=>{
    return value.id==id
  })
}
// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
    noInfo: true, publicPath: config.output.publicPath,
}));
app.use(require("webpack-hot-middleware")(compiler));

app.get('/TODO',(req,res)=>{ //Read
  return res.json(TODO)
})
app.post('/TODO',(req,res)=>{ //Create
  var content = req.body.content;
  var ID=content[0]+String(TODO.length)
  TODO.push({content:content,id:ID,completed:false})
  return res.status(200).json({"status":`TODO Created`,ID:ID})
})
app.put('/TODO/:id',(req,res)=>{ //Edit
  var ID= req.params.id;
  var content = req.body.content;
  var index =GetIndexFromID(ID);
  if(index==-1) return res.status(404).json({"error":"TODO not found"})
  TODO[GetIndexFromID(ID)].content=content;
  return res.status(200).json({"Status":`TODO ${ID} has been updated`})
})
app.post('/TODO/:id',(req,res)=>{ //completed
  var ID= req.params.id;
  var completed = req.body.content|false;
  var index =GetIndexFromID(ID);
  if(index==-1) return res.status(404).json({"error":"TODO not found"})
  TODO[index].completed=completed;
})
app.delete('/TODO/:id',(req,res)=>{//delete
  var ID= req.params.id;
  var index =GetIndexFromID(ID);
  if(index==-1) return res.status(404).json({"error":"TODO not found"})
  TODO.splice(index,1)
  return res.status(200).json({"status":`TODO ${ID} has been deleted`})
})



http.listen(port, async ()=>{
  console.log(`Listen on :${port}`);
});