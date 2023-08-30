
let user = new User("","")
let todoStatus = document.querySelector('#to-do')
let inProgress = document.querySelector('#in-progress')
let done = document.querySelector('#done')
let h2 = document.querySelector("h2")
let projectsList = document.querySelector("#projects")
let options = document.querySelector("#options")
let addTodoDiv = document.querySelector(".add-todo-div")
let addProjectDiv = document.querySelector(".add-project-div")
let projectForm = document.querySelector('#form1')
let todoForm = document.querySelector('#form2')
let dropTargets = document.querySelectorAll(".drop-target")
let logout = document.querySelector("#log-out")
let greeting = document.querySelector('#greeting')



fetch('http://amaaq.lol/auth/protected',{
    method: 'POST',
    headers :{
        'Cache-Control':'no-cache',
        'Content-Type': 'application/json',
        'Accept':'application/json'
    }
})
.then((res)=>res.json())
.then((data)=>{
    let user = new User(data.user.fname,data.user.lname)
    if(data.user.projects){
        user.projects = JSON.parse(data.user.projects)
    }else {
        user.projects = [new Project('separate','black')]
    }
    greeting.textContent = `Mr. ${user.fname} ${user.lname.toUpperCase()}`
    user.initialize()
    user.select()
    updateProjects()
    showTodos()
    updateOptions()
})

updateProjects()
        logout.addEventListener("click",()=>{
            fetch('http://amaaq.lol/auth/logout',{
                method: 'POST',
            }).then(window.open('http://amaaq.lol',"_self"))
        })
        hideTodoForm()
        hideProjectForm()
        addTodoDiv.addEventListener("click",(e)=>{
            showTodoForm()
            hideProjectForm()
        })
        addProjectDiv.addEventListener("click",()=>{
            showProjectForm()
            hideTodoForm()
        })
        
        dropTargets.forEach(dropTarget => {
            dropTarget.addEventListener('dragenter', dragEnter)
            dropTarget.addEventListener('dragover', dragOver);
            dropTarget.addEventListener('drop', drop);
        });
        
        
        todoForm[4].addEventListener("change",(e)=>{
            if(e.currentTarget.value == "new"){
                todoForm[5].disabled = false
                todoForm[6].disabled = false
            }else{
                todoForm[5].disabled = true
                todoForm[6].disabled = true
            }
        });
        todoForm[8].addEventListener("click",hideTodoForm)
        
        projectForm[3].addEventListener("click",hideProjectForm)
        
        projectForm[2].addEventListener("click",(e)=>{
            e.preventDefault()
            if(projectForm[0].value == ""){
                projectForm[0].style.borderColor = "red"
            }else {
                user.addProject(projectForm[0].value,projectForm[1].value)
                projectForm.reset()
                hideProjectForm()
                updateProjects()
                updateOptions()
               
            }
            
        })
        todoForm[7].addEventListener("click",(e)=>{
            e.preventDefault()
            if(todoForm[0].value == ""){
                todoForm[0].style.borderColor = "red"
            }else if(todoForm[4].value == "new" && todoForm[5].value == "") {
                todoForm[5].style.borderColor = "red"
            }else {
                if(todoForm[4].value == "new" && todoForm[5].value != ""){
                    user.addProject(todoForm[5].value,todoForm[6].value)
                    user.projects[user.projects.length-1].addTodo(todoForm[0].value,todoForm[3] || "NO DESCRIPTION AVAILABLE".value,todoForm[1].value || "no due date",todoForm[2].value)
                    updateProjects()
                    showTodos()
                }else {
                    user.projects.find(element=> element.projectId == todoForm[4].selectedOptions[0].value).addTodo(todoForm[0].value,todoForm[3].value || "NO DESCRIPTION AVAILABLE",todoForm[1].value || "no due date",todoForm[2].value)
                    updateProjects()
                    showTodos()
                }
                todoForm.reset()
                todoForm[5].disabled = true
                todoForm[6].disabled = true
                hideTodoForm()
                updateOptions()
            }
        })




function hideTodoForm(){
    addTodoDiv.style.display = "flex";
    todoForm.parentElement.style.display = "none"
}
function showTodoForm(){
    addTodoDiv.style.display = "none";
    todoForm.parentElement.style.display = "flex"
    todoForm[0].style.borderColor = "var(--btcolor)"
    todoForm[5].style.borderColor = "var(--btcolor)"
    todoForm[0].focus()
}
function hideProjectForm(){
    addProjectDiv.style.display = "flex";
    projectForm.style.display = "none"
}
function showProjectForm(){
    addProjectDiv.style.display = "none";
    projectForm.style.display = "flex"
    projectForm[0].style.borderColor = "var(--btcolor)"
    projectForm[0].focus()
}

function updateProjects() {
    projectsList.textContent = ""
    user.projects.forEach((element,index)=>{

        let li = document.createElement('li')
        let h4 = document.createElement('h4')
        let span = document.createElement('span')
        let icon = document.createElement('i')
        h4.textContent = element.name 
        h4.addEventListener("click",()=>{
            user.select(element.projectId)
            showTodos()
        })
        span.style.backgroundColor = element.color
        icon.setAttribute("class","fa-solid fa-trash-can")
        icon.addEventListener("click",()=>{
            user.deleteProject(element.projectId)
            user.select()
            updateProjects()
            showTodos()
        })
        li.appendChild(span)
        li.appendChild(h4)
        li.id = element.projectId
        if(index!=0){li.appendChild(icon)}
        projectsList.appendChild(li)
    })
}


function showTodos(){
    todoStatus.textContent = ""
    inProgress.textContent = ""
    done.textContent = ""
    h2.textContent = user.selected.name
    user.selected.todos.forEach(todo=>{
        
            let li = createTodoListElement(todo.todoId)
            let arr = createTodoDescriptionAndShowButton(todo.description)
            li.appendChild(createTodoDeleteButton(todo.todoId))
            li.appendChild(arr[1])
            li.appendChild(createTodoTitleElement(todo.title))
            li.appendChild(createTodoDateElement(todo.dueDate))
            li.appendChild(arr[0])
            switch (todo.status){
                case "to-do" : {
                    todoStatus.appendChild(li);
                    break;
                }
                case "in-progress" : {
                    inProgress.appendChild(li); 
                    break;
                }
                case "done" : {
                    done.appendChild(li); 
                    break;
                }
            }
        })
    }

function createTodoListElement(id){
    let li = document.createElement("li")
    li.setAttribute("draggable","true")
    li.addEventListener("dragstart",(e)=>{
        e.dataTransfer.setData('text',id)
    })
    return li
}
function createTodoTitleElement(title){
    let p = document.createElement("p")
    p.textContent = title
    return p
}
function createTodoDateElement(dueDate){
    let span = document.createElement("span")
    span.textContent = dueDate
    return span
}
function createTodoDeleteButton(id){
    let del = document.createElement('i')
    del.setAttribute("class","fa-solid fa-trash-can")
    del.addEventListener("click",()=>{
        user.selected.deleteTodo(id)
        showTodos()
    })
    return del
}
function createTodoDescriptionAndShowButton(todoDescription){
    let description = document.createElement('div')
    description.textContent = todoDescription
    description.setAttribute("class","information")
    let button = document.createElement('i')
    button.setAttribute("class","fa-solid fa-circle-info")
    button.addEventListener("click",function(){
        let informationDivs = document.querySelectorAll(".information");
        if(description.classList.contains("displayed")){
            description.classList.remove("displayed")
        }else {
            informationDivs.forEach(infoDiv=>{
                if(infoDiv.classList.contains("displayed")){
                    infoDiv.classList.remove("displayed")
                }
            })
            description.classList.add("displayed")

        }
    })
    return [description,button]
}

function updateOptions(){
    let str = ""
    user.projects.forEach(element=>{
        str +=`<option value='${element.projectId}'>${element.name.toUpperCase()}</option>`
    })
    str +='<option value="new" id="new-project">New Project</option>'
    options.innerHTML = str
}

function dragEnter(e) {
    e.preventDefault()
}

function dragOver(e) {
    e.preventDefault()
}

function drop(e) {
    e.preventDefault()
    let id = e.dataTransfer.getData('text')
    let element = e.target
    while(element.classList[0] !="drop-target"){
        element = element.parentElement
    }
    user.selected.todos.find(todo=> todo.todoId == id).setStatus(element.lastElementChild.id)
    showTodos()
}
   



function User(fname,lname){
    this.fname = fname
    this.lname = lname
    this.projects = []
    this.selected = [new Project('separate','black')]
}
User.prototype.select = function(id){
    if(id){
        this.selected = this.projects.find(element=> element.projectId == id)
    }else {
        this.selected = []
    }
}
User.prototype.addProject =  function (name,color){
    this.projects.push(new Project(name,color))
    registerProjects()
}
User.prototype.initialize = function(){
    this.projects.forEach(project=>{
        Object.setPrototypeOf(project,Project.prototype)
        project.todos.forEach(todo=>{
            Object.setPrototypeOf(todo,Todo.prototype)
        })
    })
}

User.prototype.deleteProject = function (projectId){
    this.projects.splice(this.projects.findIndex(element => element.projectId==projectId),1)
    registerProjects()
}

function Project(name,color){
    this.projectId = Date.now()
    this.name = name.toLowerCase();
    this.color = color;
    this.todos = []
}
Project.prototype.addTodo = function (title,description,dueDate,priority){
    this.todos.push(new Todo(title,description,dueDate,priority))
    registerProjects()
}

Project.prototype.deleteTodo  = function (id){
    this.todos.splice(this.todos.findIndex(element=>element.todoId==id),1)
    registerProjects()
}
function Todo(title,description,dueDate,priority){
    this.todoId = Date.now()
    this.title = title.toLowerCase();
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.status = "to-do";
}
Todo.prototype.setStatus = function(status){
    this.status = status
    registerProjects()
}



function registerProjects(){
    fetch('http://amaaq.lol/todo',{
        method: 'POST',
        headers :{
            'Cache-Control':'no-cache',
            'Content-Type': 'application/json',
            'Accept':'application/json'
        },
        body: JSON.stringify({
            projects : JSON.stringify(user.projects)
        })
    }).then(res=>res.json()).then(data=>{console.log(data)})
}



