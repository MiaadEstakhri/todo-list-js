const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector(".todo-list");
const selectedFilter = document.querySelector(".filter-todos");
let todos = [];

todoForm.addEventListener("submit", addTodoList);
selectedFilter.addEventListener("change", filterTodos);

function createTodos(todos) {
  let result = "";
  todos.forEach((todo) => {
    result += `<li class="todo">
    <p class="title__todo">${todo.title}</p>
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

  todos.push(newTodo);

  createTodos(todos);
}

function filterTodos(e) {
  const filter = e.target.value;
  switch (filter) {
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
  console.log(e.target.dataset.todoId);
  const todoId = Number(e.target.dataset.todoId);
  todos = todos.filter((t) => t.id !== todoId);
  createTodos(todos);
}
