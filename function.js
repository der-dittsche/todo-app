const todoButtonAdd = document.querySelector("#todoAdd");
const todoButtonDel = document.querySelector("#todoDelete");
const todoElements = document.querySelector("#todoList");
const todoInput = document.querySelector("#todoInput");
const todoUrl = "http://localhost:4730/todos";

let todos = [];

function loadTodos() {
  fetch(todoUrl)
    .then((response) => response.json())
    .then((todosFromApi) => {
      todos = todosFromApi;
      renderTodos();
    });
}

function renderTodos() {
  todoElements.innerHTML = "";

  todos.forEach((todo) => {
    const todoElement = document.createElement("li");

    const todoCheckbox = document.createElement("input");
    todoCheckbox.type = "checkbox";
    todoCheckbox.checked = todo.done;
    todoElement.appendChild(todoCheckbox);

    const todoDescription = document.createTextNode(todo.description);
    todoElement.append(todoDescription);

    todoElements.setAttribute("data-id", todo.id);
    todoElements.appendChild(todoElement);
  });
}

function addTodoElement() {
  todoInput.value = "";

  if (todoInput.length > 0) {
    const newTodo = {
      description: todoInput.value,
      done: false,
    };
    fetch(todoUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newTodo),
    })
      .then((response) => response.json())
      .then((newTodoFromApi) => {
        todos.push(newTodoFromApi);
        renderTodos();
      });
  }
}

todoButtonAdd.addEventListener("click", addTodoElement);

loadTodos();
