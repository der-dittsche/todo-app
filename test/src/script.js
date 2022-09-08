// ist der state der alle todo daten beinhaltet
let todos = [];

function getLocalStorage() {
  if (localStorage.getItem("todos")) {
    const todosInLocalStorage = localStorage.getItem("todos");
    return JSON.parse(todosInLocalStorage);
  } else {
    return [];
  }
}
todos = getLocalStorage();

// ^____ Array mit einträgen aus dem Localstorage befüllt werden
// Neue Einträge müssen in das todos array, und in den localstorage gespeichert werden

function addTodo(text) {
  todos.push({
    isDone: false,
    text: text,
  });
}

function updateLocalStore() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

const newTodoInputElement = document.querySelector("#new-todo");

const newButnElement = document.querySelector("#new-item-btn");
newButnElement.addEventListener("click", function () {
  addTodo(newTodoInputElement.value);
  render();
  updateLocalStore();
  // reset input feld
  newTodoInputElement.value = "";
});

// list html element wo Einträge angezeigt werden sollen
const todoListElement = document.querySelector(".todo-list");

function render() {
  // reset
  todoListElement.innerHTML = "";

  // aus dem todos state einzelne todos erzeugen
  for (let todo of todos) {
    // dynamisch li html Elemente erzeugen mit den Daten von todo
    const listItemElement = document.createElement("li");
    listItemElement.innerText = todo.text;

    const checkboxElement = document.createElement("input");
    checkboxElement.type = "checkbox";

    if (todo.isDone) {
      checkboxElement.checked = true;
    }

    listItemElement.appendChild(checkboxElement);
    todoListElement.appendChild(listItemElement);
  }
}

render();
