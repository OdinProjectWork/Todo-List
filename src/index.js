import "./style.css";
import { TodoListFactory } from "./todoFactory";

const todoList = TodoListFactory();

todoList.loadTodos();

const addTodoForm = document.createElement("form");
addTodoForm.innerHTML =
  '<input type = "text" id = "title" placeholder = "Todo title" required><input type = "text" id = "description" placeholder = "Description"><input type = "date" id = "dueDate"><select id = "priority"> <option value = "low">Low</option><option value = "medium">Medium</option><option value = "high">High</option></select><button type = "submit">Add Todo</button>';

addTodoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const dueDate = document.getElementById("dueDate").value;
  const priority = document.getElementById("priority").value;

  todoList.addTodo(title, description, dueDate, priority);
  todoList.saveTodos();
  renderTodos();
  addTodoForm.reset();
});

function renderTodos() {
  const todoContainer = document.getElementById("todo-container");
  todoContainer.innerHTML = "";

  todoList.getTodos().forEach((todo, index) => {
    const todoElement = document.createElement("div");
    todoElement.className = `todo-item ${todo.completed ? "completed" : ""}`;
    todoElement.innerHTML = `<h3>${todo.title}</h3><p>${todo.description}</p><p>Due: ${todo.dueDate}</p><p>Priority: ${todo.priority}</p><button id = "toggle" onclick="toggleTodo(${index})">Toggle Complete</button><button  id = "delete" onclick="deleteTodo(${index})">Delete</button>`;
    todoContainer.appendChild(todoElement);
  });
}

window.toggleTodo = (index) => {
    todoList.getTodos()[index].toggleComplete();
    todoList.saveTodos();
    renderTodos();
};

window.toggleTodo = (index) => {
    todoList.getTodos()[index].toggleComplete();
    todoList.saveTodos();
    renderTodos();
};

window.deleteTodo = (index) => {
    todoList.removeTodo(index);
    todoList.saveTodos();
    renderTodos();
}

const content = document.getElementById('content');
content.appendChild(addTodoForm);
const todoContainer = document.createElement('div');
todoContainer.id = 'todo-container';
content.appendChild(todoContainer);

renderTodos();
