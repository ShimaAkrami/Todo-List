console.log("started my project...");

const toggleBtn = document.querySelector(".dark-toggle-btn");

if (localStorage.getItem("darkMode") === "enabled") {
  document.body.classList.add("dark");
}
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  if (document.body.classList.contains("dark")) {
    localStorage.setItem("darkMode", "enabled");
  } else {
    localStorage.setItem("darkMode", "disabled");
  }
});


const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const ul = document.getElementById("todo-list");

//function getTodosFromLocalStorage() { return JSON.parse(localStorage.getItem("todos")) || [];}

function getTodosFromLocalStorage() {
  const todos = localStorage.getItem("todos");
  if (!todos || todos === "undefined") {
    return [];
  }
  return JSON.parse(todos);
}
function setItemLocal(todos) {
  return localStorage.setItem("todos", JSON.stringify(todos));
}  


function removeFromLocalStorage(todotext) { 
  debugger
  updatedtodos = [];
  const todos = getTodosFromLocalStorage();
  for (var i = 0; i < todos.length; i++) {
    if (todos[i] !== todotext) {
      updatedtodos.push(todos[i]);
    }
  }
  setItemLocal(updatedtodos);
}  


function addTodoToDom(todotext) {
  debugger;
  var li = document.createElement("li");
  li.textContent = todotext;

  const deletebtn = document.createElement("button");
  deletebtn.innerHTML = "<i class='fas fa-times-circle'> </i>";
deletebtn.classList.add('delete-btn')
  deletebtn.addEventListener("click", function () {
    li.remove();
    removeFromLocalStorage(todotext);
  });

  li.appendChild(deletebtn);
  ul.appendChild(li);
}


function savedToLocalStorage(todotext) { 
  debugger
  const todos = getTodosFromLocalStorage();
  todos.push(todotext);
  setItemLocal(todos);
}

window.addEventListener("DOMContentLoaded", () => {
  const todosaved = getTodosFromLocalStorage();
  for (var i = 0; i < todosaved.length; i++) {
    addTodoToDom(todosaved[i]);
  }
});

form.addEventListener("submit", function (event) {
  debugger;
  event.preventDefault();
  var todotext = input.value.trim();
  if (todotext == "") {
    return;
  }
  addTodoToDom(todotext);

  savedToLocalStorage(todotext);
  input.value = "";
});
