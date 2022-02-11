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


// ***** FUNCTIONS *****
function addTask(e) {
    /*document.head.childNodes[1].href = "list-style2.css";*/
    e.preventDefault();
    const value = toDo.value;
    const id = new Date().getTime().toString();
    if (value !== "" && editFlag === false) {
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
            <button type="button" class="edit-btn">Edit</button>
            <button type="button" class="delete-btn">Delete</button>
                <i class="fas fa-trash"></i>
        </div>`;
        // append child
        list.appendChild(element);
        // show container
        container.classList.add("show-container");
        // add to local storage
        addToLocalStorage(id, value);
        // set back to default
        setBackToDefault();
    } else if (value !== "" && editFlag === true) {
        console.log('editing');
    } else {
        console.log('empty value');
    }

    /*const template = document.querySelector('.task-item.template');
    const item = template.cloneNode(true);
    item.classList.remove('template');
    item.childNodes[1].innerHTML = toDo.value;
    item.childNodes[3].childNodes[5].addEventListener('click', () => item.remove());
    container.append(item);*/
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
    console.log("added to local storage");
}

// ***** SETUP ITEMS *****
