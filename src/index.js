import _ from 'lodash'
import {Get,Create,Update,Delete,CheckOrNot} from './Acces'
import './normalize.css'
import './style.css'

const DoICreate=true;
const idCreate=""
var RenderList=()=>{
  Get().then((value)=>{
    const list=document.getElementById('TODOLIST')
    list.innerHTML=""
   if(value.length>0){
     value.forEach(element => {
       var li= document.createElement('li')
       var check = document.createElement('input')
       check.setAttribute("type", "checkbox");
       check.checked=element.completed
       check.onchange=(event)=>{
         console.log(event.target.checked)
         CheckOrNot(event.target.parentElement.id,event.target.checked)
       }
       li.innerHTML=element.content
       li.id=element.id
       li.className='noback'
       li.appendChild(check)

       var {edit,del} =createEdDel(element.id)
          li.appendChild(edit)
          li.appendChild(del)
       list.appendChild(li)
     });
     
   }
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
    Delete(id)
    RenderList()
  }
  edit.appendChild(editimg)
  del.appendChild(delimg)
  return {edit,del}
}
function component() {
    const element = document.createElement('div');
    const button = document.createElement('button');
    const TextArea = document.createElement('input')
    const List = document.createElement('ul')
    List.id="TODOLIST"
    RenderList()
    button.innerHTML = 'Save TODO';
    TextArea.id="TodoArea"
    TextArea.placeholder="Todo Text"
    element.id="Test"
   element.appendChild(TextArea);
   element.appendChild(button);
   element.appendChild(List)


   button.onclick = (event)=>{
     Create(TextArea.value)
     RenderList()
   }

    return element;
  }
  
  let element = component(); // Store the element to re-render on print.js changes
 document.body.appendChild(element);

  if (module.hot) {
    module.hot.accept('./Acces.js', function() {
      console.log('Accepting the updated Access module!');
     document.body.removeChild(element);
     element = component(); // Re-render the "component" to update the click handler
     document.body.appendChild(element);
    })
    module.hot.accept('./index.js', function() {
      console.log('Accepting the updated Index.js module!');
      window.location.reload()
    })
  }