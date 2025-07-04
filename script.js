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
  debugger;
  const updatedtodos = [];
  const todos = getTodosFromLocalStorage();
  for (var i = 0; i < todos.length; i++) {
    if (todos[i].text !== todotext) {
      updatedtodos.push(todos[i]);
    }
  }
  setItemLocal(updatedtodos);
}

function toggleCompletedInLocalStorage(todotext) {
  const todos = getTodosFromLocalStorage();
  for (const todo of todos) {
    if (todo.text === todotext) {
      todo.completed = !todo.completed;
      break;
    }
  }
  setItemLocal(todos);
}

function addTodoToDom(newTodo) {
  debugger;
  var li = document.createElement("li");

  const checkCircle = document.createElement("span");
  checkCircle.classList.add("check-circle");
//موقع رفرش شدن باید اینارو بدونه
  if (newTodo.completed) checkCircle.classList.add("checked");
  

  const span = document.createElement("span");
  span.textContent = newTodo.text;
//موقع رفرش شدن باید اینارو بدونه
  if (newTodo.completed) span.classList.add("completed");

  checkCircle.addEventListener("click", function () {
    debugger;
    checkCircle.classList.toggle("checked");
    span.classList.toggle("completed");
    toggleCompletedInLocalStorage(newTodo.text);
  });

  const deletebtn = document.createElement("button");
  deletebtn.innerHTML = "<i class='fas fa-times-circle'> </i>";
  deletebtn.classList.add("delete-btn");
  deletebtn.addEventListener("click", function () {
    li.remove();
    removeFromLocalStorage(newTodo.text);
  });
  li.appendChild(checkCircle);
  li.appendChild(span);
  li.appendChild(deletebtn);
  ul.appendChild(li);
}

function savedToLocalStorage(newTodo) {
  debugger;
  const todos = getTodosFromLocalStorage();
  todos.push(newTodo);
  setItemLocal(todos);
}

window.addEventListener("DOMContentLoaded", () => {
  const todosaved = getTodosFromLocalStorage();
  for (var i = 0; i < todosaved.length; i++) {
    addTodoToDom(todosaved[i]);
  }
  //or
  //for(const todo of todosaved){
  //addTodoToDom(todo)
  //}
});

form.addEventListener("submit", function (event) {
  debugger;
  event.preventDefault();
  var todotext = input.value.trim();
  if (todotext === "") return;
  const newTodo = { text: todotext, completed: false };
  addTodoToDom(newTodo);

  savedToLocalStorage(newTodo);
  input.value = "";
});
