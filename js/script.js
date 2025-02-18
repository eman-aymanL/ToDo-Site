const myApiKey="676ea8dd60a208ee1fded591"
const todoInput =document.getElementById('todoInput')
const loader = document.getElementById('loader') 
const completeIcon=document.getElementById('completeIcon')

getTodo()
todoInput.addEventListener('keyup',function(e){
    if(e.code==='Enter'|| e.code === 'Done'){
        addTodo(todoInput.value)
    }
})

document.getElementById("addTaskBtn").addEventListener("click", function() {
    addTodo(todoInput.value);
});


//add todo
async function addTodo(term){
    try{
        var note ={
            title: term,
            apiKey: myApiKey
        }
        var response = await fetch('https://todos.routemisr.com/api/v1/todos',{
            method:"Post",
            body: JSON.stringify(note),
            headers:{
                "content-Type": "application/json"
            }
        })
        var data =await response.json()
        clear()
        getTodo()
    }
    catch(error){
        console.log(error)
    }
}

//get todo
async function getTodo(){
    try{
        loader.classList.replace('d-none','d-block')
        var response = await fetch(`https://todos.routemisr.com/api/v1/todos/${myApiKey}`)
        var data =await response.json()
        loader.classList.replace('d-block','d-none')
       displayData(data.todos)
    }
    catch(error){
        console.log(error)
    }
}


//display data
function displayData(list){
    var container=``
    for(var i=0 ; i<list.length ; i++){
        //console.log(list[i])
        container+=`<div id="addedTodo" class="${list[i].completed? 'bg-success bg-opacity-50' : ''} d-flex justify-content-between m-3 p-2">
        <span>${list[i].title}</span>
        <div class="d-flex justify-content-between">
        <i id="completeIcon" onclick="taskCompleted('${list[i]._id}')" class="d-block fa-solid fa-check text-light bg-danger rounded-circle p-1 me-4"></i>
        <i onclick="deleteTodo('${list[i]._id}')" class="fs- fa-solid fa-xmark text-light bg-danger rounded-circle p-1"></i>
        </div>
        </div>
        `
    }
    document.getElementById('rowData').innerHTML=container

}


//delt todo
async function deleteTodo(id){
    try{
        var todoId={
            todoId: id
        }
        var response=await fetch('https://todos.routemisr.com/api/v1/todos',{
            method:"Delete",
            body:JSON.stringify(todoId),
            headers:{
                "content-Type": "application/json"
            }
        })
        var data=await response.json()
        getTodo()
    }
    catch(error){
        console.log(error)
    }
}

//clear 
function clear(){
    todoInput.value=null
}


async function taskCompleted(id){
    try{
        var todoId={
            todoId: id
        }
        var response=await fetch('https://todos.routemisr.com/api/v1/todos',{
            method:"Put",
            body:JSON.stringify(todoId),
            headers:{
                "content-Type": "application/json"
            }
        })
        var data=await response.json()
        console.log(data)
        getTodo()
       
    }
    catch(error){
        console.log(error)
    }
}