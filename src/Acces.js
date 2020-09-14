export var Get=()=>{
 return fetch('/TODO').then(response=>response.json()).catch((res)=>console.log)
}
export var GetCAT=()=>{
    return fetch('/CAT').then(response=>response.json()).catch((res)=>console.log)
}
export var GetCatDetails=()=>{
    return fetch('/Cat/details').then(response=>response.json()).catch((res)=>console.log)
}

export var GetCatMax=()=>{
    return fetch('/Cat/max').then(response=>response.json()).then(res=>res.Max).catch((res)=>console.log)
}

export var GetCatMin=()=>{
    return fetch('/Cat/min').then(response=>response.json()).then(res=>res.Min).catch((res)=>console.log)
}

export var Create=(content)=>{
    return fetch('/TODO',{
        method:'POST',
        body:JSON.stringify({content:content}),
        headers:{
            "Content-type": "application/json; charset=UTF-8" 
        }
        
    }).then(Response=>Response.json()).catch((res)=>console.log)
}

export var Update=(id,content)=>{
    return fetch(`/TODO/${id}`,{
        method:'PUT',
        body:JSON.stringify({content:content}),
        headers:{
            "Content-type": "application/json; charset=UTF-8" 
        }
        
    }).then(Response=>Response.json()).catch((res)=>console.log)
}
export var CheckOrNot=(id,check)=>{
    return fetch(`/TODO/${id}/check`,{
        method:'POST',
        body:JSON.stringify({content:check}),
        headers:{
            "Content-type": "application/json; charset=UTF-8" 
        }
        
    }).then(Response=>Response.json()).catch((res)=>console.log)
}
export var AssignToCat=(id,cat)=>{
    return fetch(`/TODO/${id}/cat`,{
        method:'POST',
        body:JSON.stringify({cat:cat}),
        headers:{
            "Content-type": "application/json; charset=UTF-8" 
        }
        
    }).then(Response=>Response.json()).catch((res)=>console.log)
}

export var Delete=(id)=>{
    return fetch(`/TODO/${id}`,{
        method:'DELETE',
        headers:{
            "Content-type": "application/json; charset=UTF-8" 
        }
        
    }).then(Response=>Response.json()).catch((res)=>console.log)
}




export default {Get,Create,Update,Delete}