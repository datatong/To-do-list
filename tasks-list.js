// ----- SELECT ITEMS -----
const toDoForm = document.querySelector('.to-do-form');
const toDo = document.getElementById('to-do');
const submitBtn = document.getElementById('submit-btn');
const container = document.querySelector('.task-container');
const list = document.querySelector('.task-list');
const clearAll = document.querySelector('.clear-all-btn');

// ----- EVENT LISTENERS -----
toDoForm.addEventListener('submit', addTask);

// ----- FUNCTIONS -----
function addTask(e) {
    e.preventDefault();
    console.log(toDo.value);
}

// ----- LOCAL STORAGE -----

// ----- SETUP ITEMS -----
