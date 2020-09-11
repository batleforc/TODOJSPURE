const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.dev.js');
const compiler = webpack(config);
var http = require('http').Server(app);
var port = process.env.PORT||3000;

app.use(express.json());
app.use(webpackDevMiddleware(compiler, {
    noInfo: true, publicPath: config.output.publicPath,
}));
app.use(require("webpack-hot-middleware")(compiler));

var TODO=[];
var Cat=["urgent","perso","pro","admin","unasigned"]
var GetIndexFromID=(id)=>{
  return TODO.findIndex((value)=>{
    return value.id==id
  })
}
var GetHowMuchToDoForCat=(cat)=>TODO.filter((Todo)=>Todo.cat===cat.toLowerCase()).length


app.get('/TODO',(req,res)=>res.json(TODO)) //get the TODO array
app.get('/CAT',(req,res)=>res.json(Cat)) //get the cat array
app.get('/Cat/details',(req,res)=>res.json(Cat.map((value)=>{return {Cat:value,Value:GetHowMuchToDoForCat(value)}})))
app.post('/TODO',(req,res)=>{ //Create
  var content = req.body.content;
  var ID=content[0]+String(TODO.length)
  TODO.push({content:content,id:ID,completed:false,cat:"unasigned"})
  return res.status(200).json({"status":`TODO Created with id ${ID} and was unasigned`,ID:ID,Date:Date.now})
})
app.put('/TODO/:id',(req,res)=>{ //Edit
  var ID= req.params.id;
  var content = req.body.content;
  var index =GetIndexFromID(ID);
  if(index==-1) return res.status(404).json({"error":"TODO not found"})
  TODO[GetIndexFromID(ID)].content=content;
  return res.status(200).json({"Status":`TODO ${ID} has been updated`})
})
app.post('/TODO/:id/check',(req,res)=>{ //Check Uncheck
  var ID= req.params.id;
  var completed = req.body.content|false;
  var index =GetIndexFromID(ID);
  if(index==-1) return res.status(404).json({"error":"TODO not found"})
  TODO[index].completed=completed;
  return res.status(200).json({"Status":`TODO ${ID} has been ${completed?"check":"uncheck"}`})
})
app.post('/TODO/:id/cat',(req,res)=>{ //allow to assign a cat to a todo
  var ID=req.params.id;
  var cat = req.body.cat;
  var index = GetIndexFromID(ID);
  if(index==-1) return res.status(404).json({"error":"TODO not found"})
  if(!Cat.includes(cat)) return res.status(404).json({"error":"Cat not found"})
  TODO[index].cat=cat;
  return res.status(200).json({"Status":`TODO ${ID} has been assigned to ${cat}`})
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