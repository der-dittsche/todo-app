let todoState = {
  todos: [
    { description: "Einkaufen", done: false },
    { description: "nochmehr Einkaufen", done: false },
    { description: "und nochmal Einkaufen", done: true },
  ],
};

function addTodo(text) {
  todoState.push({
    description: text,
    done: false,
  });
}

const textNewTodo = document.querySelector("#new-todo");
const addBtnTodo = document.querySelector("#add-todo");
addBtnTodo.addEventListener("click", function () {
  addTodo(textNewTodo.description);
  render();
  addBtnTodo.value = "";
});

function renderTodos() {
  const todoList = document.querySelector("#todolist");
  todoList.innerHTML = "";

  todoState.todos.forEach((todo) => {
    const newTodoElement = document.createElement("li");

    const todoCheckbox = document.createElement("input");
    todoCheckbox.type = "checkbox";
    todoCheckbox.checked = todo.done;

    todoCheckbox.addEventListener("change", (e) => {
      const newTodoStatus = e.target.checked;
      todo.done = newTodoStatus;
    });

    newTodoElement.appendChild(todoCheckbox);

    const todoText = document.createTextNode(todo.description);
    newTodoElement.appendChild(todoText);

    todoList.appendChild(newTodoElement);
  });
}

renderTodos();
