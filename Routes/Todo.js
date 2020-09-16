var express = require('express');
var router = express.Router();

var TODO=[];
var Cat=["urgent","perso","pro","admin","unasigned"]
var GetIndexFromID=(id)=>{
  return TODO.findIndex((value)=>{
    return value.id==id
  })
}
var GetHowMuchToDoForCat=(cat)=>TODO.filter((Todo)=>Todo.cat===cat.toLowerCase()).length

router.get('/TODO',(req,res)=>res.json(TODO)) //get the TODO array
router.get('/CAT',(req,res)=>res.json(Cat)) //get the cat array
router.get('/Cat/details',(req,res)=>res.json(Cat.map((value)=>{return {Cat:value,Value:GetHowMuchToDoForCat(value)}})))
router.get('/Cat/max',(req,res)=>res.json({Max:Math.max(...Cat.map((value)=>GetHowMuchToDoForCat(value)))}))
router.get('/Cat/min',(req,res)=> res.json({Min:Math.min(...Cat.map((value)=>GetHowMuchToDoForCat(value)))}))
router.post('/TODO',(req,res)=>{ //Create
  var content = req.body.content;
  var ID=content[0]+String(TODO.length)
  TODO.push({content:content,id:ID,completed:false,cat:"unasigned"})
  return res.status(200).json({"status":`TODO Created with id ${ID} and was unasigned`,ID:ID,Date:Date.now})
})
router.put('/TODO/:id',(req,res)=>{ //Edit
  var ID= req.params.id;
  var content = req.body.content;
  var index =GetIndexFromID(ID);
  if(index==-1) return res.status(404).json({"error":"TODO not found"})
  TODO[GetIndexFromID(ID)].content=content;
  return res.status(200).json({"Status":`TODO ${ID} has been updated`})
})
router.post('/TODO/:id/check',(req,res)=>{ //Check Uncheck
  var ID= req.params.id;
  var completed = req.body.content|false;
  var index =GetIndexFromID(ID);
  if(index==-1) return res.status(404).json({"error":"TODO not found"})
  TODO[index].completed=completed;
  return res.status(200).json({"Status":`TODO ${ID} has been ${completed?"check":"uncheck"}`})
})
router.post('/TODO/:id/cat',(req,res)=>{ //allow to assign a cat to a todo
  var ID=req.params.id;
  var cat = req.body.cat;
  var index = GetIndexFromID(ID);
  if(index==-1) return res.status(404).json({"error":"TODO not found"})
  if(!Cat.includes(cat)) return res.status(404).json({"error":"Cat not found"})
  TODO[index].cat=cat;
  return res.status(200).json({"Status":`TODO ${ID} has been assigned to ${cat}`})
})

router.delete('/TODO/:id',(req,res)=>{//delete
  var ID= req.params.id;
  var index =GetIndexFromID(ID);
  if(index==-1) return res.status(404).json({"error":"TODO not found"})
  TODO.splice(index,1)
  return res.status(200).json({"status":`TODO ${ID} has been deleted`})
})


module.exports=router;