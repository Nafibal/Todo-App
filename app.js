// SELECT ELEMENT
const todoForm = getElement(".todo-form");
const todoInput = getElement(".todo-input");
const submitBtn = getElement(".submit-btn");
const container = getElement(".container");

// EVENT LISTENER
submitBtn.addEventListener("click", addItem);
document.addEventListener("DOMContentLoaded", getTodos);

// FUNCTION
function addItem(e) {
  e.preventDefault();
  const todoList = document.createElement("div");
  appendElement(todoList, container, todoInput.value);
  saveLocalStorage(todoInput.value);
  todoInput.value = "";
  buttonEvents(todoList);
}

function buttonEvents(list) {
  list.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      e.target.parentElement.remove();
      removeLocalStorage(list);
    }
    if (e.target.classList.contains("complete-btn")) {
      e.target.parentElement.firstElementChild.classList.toggle("completed");
    }
  });
}

function appendElement(child, parent, item) {
  child.classList.add("todo-list");
  child.innerHTML = `<li>${item}</li>
        <button class="complete-btn"><i class="fas fa-check"></i></button>
        <button class="delete-btn"><i class="fas fa-trash"></i></button>`;
  parent.appendChild(child);
}

function saveLocalStorage(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach((todo) => {
    const todoList = document.createElement("div");
    appendElement(todoList, container, todo);
    buttonEvents(todoList);
  });
}

function removeLocalStorage(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getElement(selected) {
  const element = document.querySelector(selected);
  if (element) {
    return element;
  }
  throw new Error(`${selected} element didn't exist`);
}
