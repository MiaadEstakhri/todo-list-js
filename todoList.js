const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector(".todo-list");
const todos = [];
todoForm.addEventListener("submit", addTodoList);

function createElement(e) {
  const newTodo = {
    id: Date.now(),
    title: todoInput.value,
    createdAt: new Date().toISOString(),
    isComplete: false,
  };

  todos.push(newTodo);

  if (!todoInput.value) return null;

  let result = "";
  todos.forEach((todo) => {
    console.log(todo);
    result += `<li class="todo">
    <p class="title__todo">${todo.title}</p>
    <span class="todo__createdAt">${new Date(
      todo.createdAt
    ).toLocaleDateString()}</span>
    <button data-todo-id=${todo.id} class="todo-check">check</button>
    <button data-todo-id=${todo.id} class="todo-trash">Delete</button>
  </li> 
    `;
  });
  todoList.innerHTML = result;
  todoInput.value = "";
}

function addTodoList(e) {
  e.preventDefault();
  createElement(todos);
}
