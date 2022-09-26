const todoButtonAdd = document.querySelector("#todoAdd");
const todoButtonDel = document.querySelector("#todoDelete");
const todoElements = document.querySelector("#todoList");
const todoInput = document.querySelector("#todoInput");
const todoUrl = "http://localhost:4730/todos/";

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
  todoElements.innerHTML = "";

  todos.forEach((todo) => {
    const todoElement = document.createElement("li");

    const todoCheckbox = document.createElement("input");
    todoCheckbox.type = "checkbox";
    todoCheckbox.checked = todo.done;
    todoElement.appendChild(todoCheckbox);

    const todoDescription = document.createTextNode(todo.description);
    todoElement.append(todoDescription);

    todoElement.setAttribute("data-id", todo.id);
    todoElements.appendChild(todoElement);
  });
}

function addToDo() {
  console.log("Hallo Welt");
  if (todoInput.value.length > 0) {
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

function updateTodo(e) {
  const id = e.target.parentElement.getAttribute("data-id");
  const updateTodos = {
    description: e.target.nextSibling.textContent,
    done: e.target.checked,
  };
  console.log(e.target, id, updateTodos);
  fetch(todoUrl + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updateTodos),
  })
    .then((response) => response.json())
    .then(() => {
      loadTodos();
    });
}

function deleteTodos() {
  todos.forEach((todo) => {
    if (todo.done === true) {
      fetch(todoUrl + todo.id, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then(() => {
          loadTodos();
        });
    }
  });
}

todoButtonAdd.addEventListener("click", addToDo);
todoElements.addEventListener("change", updateTodo);
todoButtonDel.addEventListener("click", deleteTodos);

loadTodos();
