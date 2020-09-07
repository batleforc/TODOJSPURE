export var Get=()=>{
 return fetch('/TODO').then(response=>response.json())
}
export var Create=(content)=>{
    return fetch('/TODO',{
        method:'POST',
        body:JSON.stringify({content:content}),
        headers:{
            "Content-type": "application/json; charset=UTF-8" 
        }
        
    }).then(Response=>Response.json())
}

export var Update=(id,content)=>{
    return fetch(`/TODO/${id}`,{
        method:'PUT',
        body:JSON.stringify({content:content}),
        headers:{
            "Content-type": "application/json; charset=UTF-8" 
        }
        
    }).then(Response=>Response.json())
}
export var CheckOrNot=(id,check)=>{
    return fetch(`/TODO/${id}`,{
        method:'POST',
        body:JSON.stringify({content:check}),
        headers:{
            "Content-type": "application/json; charset=UTF-8" 
        }
        
    }).then(Response=>Response.json())
}

export var Delete=(id)=>{
    return fetch(`/TODO/${id}`,{
        method:'DELETE',
        headers:{
            "Content-type": "application/json; charset=UTF-8" 
        }
        
    }).then(Response=>Response.json())
}




export default {Get,Create,Update,Delete}