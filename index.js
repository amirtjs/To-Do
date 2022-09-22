const input = document.querySelector('#taskInput'),
      buttonAddTask = document.querySelector('button'),
      tasksList = document.querySelector('#tasksList'),
      removeDoneTasks = document.querySelector('#removeDoneTasks'),
      btnTheme = document.querySelector('#btnTheme'),
      linkStyle = document.querySelector('#theme'),
      emptyElHtml = `
      <li id="emptyList" class="list-group-item empty-list">
        <i class="fa-solid fa-list-check"></i>
        <div class="empty-list__title">Список дел пуст</div>
      </li>
      `;


let tasks;
if(localStorage.getItem('tasks')){
    tasks = JSON.parse(localStorage.getItem('tasks'))
    renderTasks()
}else{
    tasks = []
}   


if(localStorage.getItem('theme') === 'dark'){
    linkStyle.setAttribute('href', 'dark.css')
}



buttonAddTask.addEventListener('click', addTask)

document.addEventListener('click', deleteTask)

document.addEventListener('click', completeTask)

removeDoneTasks.addEventListener('click', deleteDoneTasks)

btnTheme.addEventListener('click', chengeTheme)


isTaskListEmpty()

function Task (description, status, id){
    this.description = description;
    this.status = status;
    this.id = id
}

function addTask(e){
    e.preventDefault()
    if(input.value === '') return
    tasks.push(new Task(input.value, false, Date.now()))
    
    
    udateLS(tasks)
    renderTasks()
    input.value = ''
}

function udateLS(tasks){
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function renderTasks(){
    tasksList.innerHTML = '';
    tasksList.innerText = '';
    let tasks = JSON.parse(localStorage.getItem('tasks'));

    tasks.forEach(element => {
        tasksList.innerHTML += `
        <li id="${element.id}" class="list-group-item d-flex justify-content-between task-item">
        <span class="task-title ${element.status? 'done': ''} ">${element.description}</span>
        <div class="task-item__buttons">
            <button type="button" data-action="done" class="btn-action">
                <i class="action fa-solid fa-check"></i>
            </button>
            <button type="button" data-action="delete" class="btn-action">
            
                <i class="action fa-solid  fa-xmark"></i>
            </button>
        </div>
        `
    });

}

function deleteTask(e){
    if(e.target.dataset.action === 'delete') {
        const elem = e.target.closest('li')
        const id = +elem.id;

        const task = tasks.findIndex(item => item.id === id)
        tasks.splice(task, 1)
        elem.remove()
        udateLS(tasks)
        isTaskListEmpty()
    }
}

function completeTask(e){
    if(e.target.dataset.action === 'done') {
        const elem = e.target.closest('li');
        const id = +elem.id;
        const textTask = elem.querySelector('.task-title')
        textTask.classList.toggle('done')
        const task = tasks.findIndex(item => item.id === id);
        tasks[task].status = !tasks[task].status;
        udateLS(tasks);
        
    }
}


function isTaskListEmpty(){
    if(tasksList.querySelectorAll('li').length === 0){
            tasksList.innerHTML = emptyElHtml

    }
}

function deleteDoneTasks(){
    tasks = tasks.filter(el => el.status !== true)
    localStorage.setItem('tasks', JSON.stringify(tasks))
    renderTasks()
}


function chengeTheme(){
    if(!localStorage.getItem('theme')){
        localStorage.setItem('theme', 'lite')
    }
    if(localStorage.getItem('theme') === 'lite'){
        localStorage.setItem('theme', 'dark')
        linkStyle.setAttribute('href', 'dark.css')
    }else{
        localStorage.setItem('theme', 'lite')
        linkStyle.setAttribute('href', 'style.css')
    }
}