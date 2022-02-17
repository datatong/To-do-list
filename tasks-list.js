// ***** SELECT ITEMS *****
const toDoForm = document.querySelector('.to-do-form');
const toDo = document.getElementById('to-do');
const submitBtn = document.getElementById('submit-btn');
const container = document.querySelector('.task-container');
const list = document.querySelector('.task-list');
const clearAll = document.querySelector('.clear-all-btn');

//edit option
let editElement;
let editFlag = false;
let editID = "";

// ***** EVENT LISTENERS *****
//submit form
toDoForm.addEventListener('submit', addTask);
// clear items
clearAll.addEventListener('click', clearAllTasks);
// load items
window.addEventListener('DOMContentLoaded', setupItems);

// ***** FUNCTIONS *****
function addTask(e) {
    /*document.head.childNodes[1].href = "list-style2.css";*/
    e.preventDefault();
    const value = toDo.value;
    const id = new Date().getTime().toString();
    if (value !== "" && editFlag === false) {
        createListItem(id, value);
        // show container
        container.classList.add("show-container");
        // add to local storage
        addToLocalStorage(id, value);
        // set back to default
        setBackToDefault();
    } else if (value !== "" && editFlag === true) {
        editElement.innerHTML = value;
        // edit local storage
        editLocalStorage(editID, value)
        setBackToDefault();
    } else {
        console.log('empty value');
    }

    /*
    const template = document.querySelector('.task-item.template');
    const item = template.cloneNode(true);
    item.classList.remove('template');
    item.childNodes[1].innerHTML = toDo.value;
    item.childNodes[3].childNodes[5].addEventListener('click', () => item.remove());
    container.append(item);
    */
}

//clear all tasks
function clearAllTasks() {
    const allTasks = document.querySelectorAll('.task-item');

    if (allTasks.length > 0) {
        allTasks.forEach(function (item) {
            list.removeChild(item);
        });
    }
    container.classList.remove("show-container");
    setBackToDefault();
    // localStorage.removeItem('list');
}

// delete function
function deleteTask(e) {
    const element= e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    list.removeChild(element);
    setBackToDefault();
    // remove from local storage
    //removeFromLocalStorage(id);
}

// edit function
function editTask(e) {
    const element= e.currentTarget.parentElement.parentElement;
    // set edit item
    editElement = e.currentTarget.parentElement.previousElementSibling;
    // set form value
    toDo.value = editElement.innerHTML;
    editFlag = true;
    editID = element.dataset.id;
    submitBtn.textContent = "edit";    
}

// set back to default
function setBackToDefault() {
    toDo.value = "";
    editFlag = false;
    editID = "";
    submitBtn.textContent = "submit";
}

// ***** LOCAL STORAGE *****
function addToLocalStorage(id, value) {
    const tasks = {id:id, value:value};
    let items = getLocalStorage();

items.push(tasks);
localStorage.setItem('list', JSON.stringify(items));
    //console.log("added to local storage");
}

function removeFromLocalStorage(id) {
    let items = getLocalStorage();

    items = items.filter(function(item) {
        if(item.id !==id) {
            return item;
        }
    });
    localStorage.setItem('list', JSON.stringify(items));
}

function editLocalStorage(id, value) {
    let items = getLocalStorage();
    items = items.map(function(item) {
        if(item.id === id) {
            item.value = value;
        }
        return item;
    });
    localStorage.setItem('list', JSON.stringify(items));
}

function getLocalStorage() {
    return localStorage.getItem("list")
        ? JSON.parse(localStorage.getItem("list"))
        : [];
}

// localStorage API
// setItem
// getItem
// removeItem
// save as strings
//
//localStorage.setItem("action", JSON.stringify(["item", "item2"]));
//const actions = JSON.parse(localStorage.getItem("action"));
//console.log(actions);
//localStorage.removeItem("action");

// ***** SETUP ITEMS *****
function setupItems() {
    let items = getlocalStorage();
    if (items.length > 0) {
        items.forEach(function(item) {
            createListItem(item.id, item.value);
        });
        container.classList.add('show-container');
    }
}

function createListItem(id, value) {
    const element = document.createElement('article');
    // add class
    element.classList.add('task-item');
    // add id
    const attr = document.createAttribute('data-id');
    attr.value = id;
    element.setAttributeNode(attr);
    element.innerHTML = `<p class="title">${value}</p>
    <div class="btn-container">
        <input type="checkbox" class="task-checkbox">
        <button type="button" class="edit-btn">Edit
            <i class="fas fa-edit"></i>
        </button>
        <button type="button" class="delete-btn">Delete
            <i class="fas fa-trash"></i>
        </button>
    </div>`;
    const deleteBtn = element.querySelector('.delete-btn');
    const editBtn = element.querySelector('.edit-btn');
    deleteBtn.addEventListener('click', deleteTask);
    editBtn.addEventListener('click', editTask);

    // append child
    list.appendChild(element);
}