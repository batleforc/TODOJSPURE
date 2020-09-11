import * as Acces from './Acces'
import {Chart} from './chart'
var RenderList=()=>{
    Acces.Get().then((value)=>{
      const list=document.getElementById('TODOLIST')
      list.innerHTML=""
      var test= Math.random()
     if(value.length>0){
       value.forEach(element => {
           console.log(element,test)
         CreateSelect(element.id,element.cat).then((select)=>{
             if(document.getElementById(element.id)) return
            var li= document.createElement('li')
            var check = document.createElement('input')
            check.setAttribute("type", "checkbox");
            check.checked=element.completed
            check.onchange=(event)=>{
              console.log(event.target.checked)
              Acces.CheckOrNot(event.target.parentElement.id,event.target.checked)
            }
            var input= document.createElement('input')
            input.id=`${element.id}input`
            input.value=element.content
            input.className='todocontent'
            input.setAttribute('style','Background-color:#a6a6a6;')
            li.innerHTML='['
            li.appendChild(select)
            li.innerHTML+=`] : `
            li.appendChild(input)
            li.id=element.id
            li.className='noback todoelement'
            li.appendChild(check)
     
            var {edit,del} =createEdDel(element.id)
               li.appendChild(edit)
               li.appendChild(del)
            list.appendChild(li)
            document.getElementById(`${element.id}input`).addEventListener('change',(event)=>{
                Acces.Update(element.id,event.target.value)
            })
            document.getElementById(`${element.id}select`).addEventListener('change',(event)=>{
                console.log("test")
                Acces.AssignToCat(event.target.parentElement.id,event.target.value)
                RenderList();
            })
         })
       });
       
     }
     Chart();
   })
}
var createEdDel=(id)=>{
  var editimg = document.createElement('img')
  var delimg = document.createElement('img')
  var edit = document.createElement('button')
  var del = document.createElement('button')
  editimg.src="https://img.icons8.com/android/24/000000/edit.png"
  delimg.src="https://img.icons8.com/android/24/000000/delete.png"
  editimg.className='noback'
  delimg.className='noback'
  edit.className="edit noback"
  del.className="remove noback"
  edit.onclick=(event)=>{
    event.target.parentElement
  }
  del.onclick=(event)=>{
    console.log(event.target.parentElement.id)
    Acces.Delete(id)
    RenderList()
  }
  edit.appendChild(editimg)
  del.appendChild(delimg)
  return {edit,del}
}
var CreateSelect=(id,cat)=>{
    return Acces.GetCAT().then((res)=>{
        var x = document.createElement("SELECT");
        x.setAttribute("id", `${id}select`);
        x.setAttribute('style',`Border:none;Background-color:#a6a6a6;`)
        res.forEach((value)=>{
            var option = document.createElement("option");
            option.setAttribute("value", value);
            option.text=value
            if(value==cat) option.setAttribute("selected","selected")
            x.appendChild(option)
        })
        return x;
    })
}
export default function component() {
    const element = document.createElement("div")
    const button = document.createElement('button');
    const TextArea = document.createElement('input')
    const List = document.createElement('ul')
    List.id="TODOLIST"
    RenderList()
    button.innerHTML = 'Save TODO';
    TextArea.id="TodoArea"
    TextArea.placeholder="Todo Text"
    element.id="TODO"
    element.appendChild(TextArea);
    element.appendChild(button);
    element.appendChild(List)


   button.onclick = (event)=>{
     Acces.Create(TextArea.value)
     RenderList()
   }

    return element;
  }
  
  let element = component(); // Store the element to re-render on print.js changes
 document.body.prepend(element);
