// Function to create a new todo item
function createToDoItem() {
    let todoData = document.getElementById('input-box').value;
    createliElement('todo-container', todoData);
    saveToLocalStorage('todoItems', todoData);
}

// Function to create li element for todo item
function createliElement(parentNode, data) {
    const listContainer = document.getElementById(parentNode);
    let li = document.createElement("li");
    li.innerHTML = data;
    li.draggable = true;
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    span.onclick = removeItem; 
    li.appendChild(span);
    listContainer.appendChild(li);
}

// Function to remove todo item
function removeItem(event) {
    event.target.parentNode.remove();
}

// Function to save todo item to local storage
function saveToLocalStorage(key, value) {
    let existingValue = getFromLocalStorage(key);
    if (existingValue === null) {
        existingValue = [];
    } else {
        existingValue = JSON.parse(existingValue);
    }
    existingValue.push(value);
    localStorage.setItem(key, JSON.stringify(existingValue));
}

// Function to retrieve from local storage
function getFromLocalStorage(key) {
    return localStorage.getItem(key);
}

// Drag and Drop functionality
const todos = document.querySelectorAll("#todo-container li");
const allContainers = document.querySelectorAll(".container");
let draggableTodo = null;

todos.forEach((todo) => {
    todo.addEventListener("dragstart", dragStart);
    todo.addEventListener("dragend", dragEnd);
});

function dragStart(e) {
    draggableTodo = this;
    e.dataTransfer.setData("text/plain", ''); // Set data transfer properly
    console.log("dragstart");
}

function dragEnd() {
    draggableTodo = null;
    console.log("dragEnd");
}

allContainers.forEach((container) => {
    container.addEventListener("dragover", dragOver);
    container.addEventListener("dragenter", dragEnter);
    container.addEventListener("dragleave", dragLeave);
    container.addEventListener("drop", dragDrop);
});

function dragOver(e) {
    e.preventDefault(); // Prevent default behavior
    console.log("dragOver");
}

function dragEnter(e) {
    e.preventDefault();
    console.log("dragEnter");
}

function dragLeave() {
    console.log("dragLeave");
}

function dragDrop() {
    this.appendChild(draggableTodo);
    console.log("dragDrop");
}