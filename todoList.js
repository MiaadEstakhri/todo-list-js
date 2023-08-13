const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector(".todo-list");
const selectedFilter = document.querySelector(".filter-todos");
let todos = [];
let filterValue = "all";

todoForm.addEventListener("submit", addTodoList);
selectedFilter.addEventListener("change", (e) => {
  filterValue = e.target.value;
  return filterTodos();
});
document.addEventListener("DOMContentLoaded", () => {
  const todos = getAllTodos();
  createTodos(todos);
});

function createTodos(todos) {
  let result = "";
  todos.forEach((todo) => {
    result += `<li class="todo">
    <p class="title__todo ${todo.isCompleted && "completed"}">${todo.title}</p>
    <span class="todo__createdAt">${new Date(
      todo.createdAt
    ).toLocaleDateString()}</span>
    <button data-todo-id=${
      todo.id
    } class="todo-check"><i class="fa-regular fa-square-check "></i></button>
    <button data-todo-id=${
      todo.id
    } class="todo-trash"><i class="fa-regular fa-trash-can"></i></button>
  </li> 
    `;
  });
  todoList.innerHTML = result;
  todoInput.value = "";

  const removeBtn = [...document.querySelectorAll(".todo-trash")];
  removeBtn.forEach((t) => t.addEventListener("click", removeTodo));

  const checkedBtn = [...document.querySelectorAll(".todo-check")];
  checkedBtn.forEach((t) => t.addEventListener("click", checkedTodo));
}

function addTodoList(e) {
  e.preventDefault();

  if (!todoInput.value) return null;

  const newTodo = {
    id: Date.now(),
    title: todoInput.value,
    createdAt: new Date().toISOString(),
    isCompleted: false,
  };

  saveTodo(newTodo);
  filterTodos();
}

function filterTodos() {
  const todos = getAllTodos();
  switch (filterValue) {
    case "all": {
      createTodos(todos);
      break;
    }
    case "completed": {
      const filteredTodos = todos.filter((t) => t.isCompleted);
      createTodos(filteredTodos);
      break;
    }
    case "uncompleted": {
      const filteredTodos = todos.filter((t) => !t.isCompleted);
      createTodos(filteredTodos);
      break;
    }
    default:
      createTodos(todos);
  }
}

function removeTodo(e) {
  let todos = getAllTodos();
  const todoId = Number(e.target.dataset.todoId);
  todos = todos.filter((t) => t.id !== todoId);
  saveAllTodo(todos);
  filterTodos();
}

function checkedTodo(e) {
  let todos = getAllTodos();
  const todoId = Number(e.target.dataset.todoId);
  const todo = todos.find((t) => t.id === todoId);
  todo.isCompleted = !todo.isCompleted;
  saveAllTodo(todos);
  filterTodos();
}

function getAllTodos() {
  const saveTodos = JSON.parse(localStorage.getItem("todos")) || [];
  return saveTodos;
}

function saveTodo(todos) {
  const saveTodos = getAllTodos();
  saveTodos.push(todos);
  localStorage.setItem("todos", JSON.stringify(saveTodos));
  return saveTodos;
}

function saveAllTodo(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}
