// Function to create a new todo item
function createToDoItem() {
    let todoData = document.getElementById('input-box').value;
    document.getElementById("input-box").value = "";
    document.getElementById('addItemBtn').disabled = true;
    document.getElementById('addItemBtn').style.background = "grey";
    createliElement('todo-container', todoData);
    saveToLocalStorage('todoItems', todoData);
}



// Function to create li element for todo item
function createliElement(parentNode, data) {
    const listContainer = document.getElementById(parentNode);
    let li = document.createElement("li");
    li.innerHTML = data;
    li.draggable = true;
    li.id = Date.now();
    // let span = document.createElement("span");
    // span.innerHTML = "\u00d7";
    // span.onclick = removeItem;
    // li.appendChild(span);
    listContainer.appendChild(li);
    li.addEventListener("dragstart", dragStart);
    li.addEventListener("dragend", dragEnd);
    adjustContainerHeight(parentNode);
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

allContainers.forEach((container) => {
    container.addEventListener("dragover", dragOver);
    container.addEventListener("dragenter", dragEnter);
    container.addEventListener("dragleave", dragLeave);
    container.addEventListener("drop", dragDrop);
});

/* Drag and Drop Functions  Starts */
function dragStart(e) {
    draggableTodo = this;
    console.log("dragstart");
    e.dataTransfer.setData("text", e.target.innerText); // Set data transfer properly
    e.dataTransfer.setData("elementId", e.target.id); // Set data transfer properly
    console.log(e.dataTransfer)

}

function dragEnd() {
    draggableTodo = null;
    console.log("dragEnd");
}

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

function dragDrop(e) {
    e.preventDefault();
    var data = e.dataTransfer.getData("text");
    var elementId = e.dataTransfer.getData('elementId');
    console.log("elementId", elementId)
    console.log(e.target.id)
    console.log(data)
    var element = document.getElementById(elementId);
    // If the event target is a different container
    if (e.target !== element.parentElement) {
        // Remove the node from its current parent
        element.parentElement.removeChild(element);
        // Append it to the new container
        createliElement(e.target.id, data);
    }
}

/* Drag and Drop Functions Ends */

function adjustContainerHeight(id) {
    var container = document.getElementById(id);
    container.style.height = 'auto'; // Reset height to auto
    var height = container.offsetHeight; // Get new height
    container.style.height = height + 50 + 'px'; // Set height
}

function addItem() {
    let data = document.getElementById("input-box").value;
    console.log(data, data.length)
    if (data.length > 5) {
        document.getElementById('addItemBtn').disabled = false;
        document.getElementById('addItemBtn').style.background = "magenta";
    }
}

// Add your function below 