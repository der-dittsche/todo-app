const newInput = document.querySelector("#todoText");
const delbtn = document.querySelector("#todoDelete");
const addbtn = document.querySelector("#todoAdd");
const todoList = document.querySelector("#todolist");
const todoUrl = "http://localhost:4730/todos";

let todos = [];

function loadTodos() {
  fetch(todoUrl)
    .then((req) => req.json())
    .then((todosFromApi) => {
      todos = todosFromApi;
      renderTodos();
    });
}

function renderTodos() {
  todoList.innerHTML = "";

  todos.forEach((todo) => {
    const todoElement = document.createElement("li");

    const todoCheckbox = document.createElement("input");
    todoCheckbox.type = "checkbox";
    todoCheckbox.checked = todo.done;
    todoElement.appendChild(todoCheckbox);

    const todoDescription = document.createTextNode(todo.description);
    todoElement.append(todoDescription);

    todoList.appendChild(todoElement);
  });
}

addbtn.addEventListener("click", () => {
  const newTodoText = newInput.value;
  const newTodo = {
    description: newTodoText,
    done: false,
  };
  fetch(todoUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTodo),
  })
    .then((req) => req.json())
    .then((newTodoFromApi) => {
      todos.push(newTodoFromApi);
      renderTodos();
    });
});

loadTodos();
