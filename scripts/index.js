import { TodoService } from "./todoService.js";
import { TodoRenderer } from "./todoRenderer.js";
import { EventBinder } from "./eventBinder.js";

class TodoApp {
  constructor() {
    this.container = document.getElementById("list");

    this.service = new TodoService();
    this.renderer = new TodoRenderer(this.container);

    this.addButton = document.querySelector('[name="add-button"]');
    this.addButton.addEventListener("click", this.addInputHandler);

    this.binder = new EventBinder(
      this.service,
      this.renderTodos,
      this.container
    );

    this.renderTodos();
  }

  get todos() {
    return this.service.getTodos();
  }

  addInputHandler = () => {
    const todoInput = document.querySelector(".todo-input");

    if (todoInput) {
      const text = todoInput.value.trim();
      todoInput.remove();
      this.addButton.textContent = "ADD";

      if (text) {
        this.service.addTodo({ text });
      }

      this.renderTodos();
    } else {
      this.showInput();
    }
  };

  showInput = () => {
    this.addButton.textContent = "SAVE";

    const todoInput = document.createElement("input");
    todoInput.type = "text";
    todoInput.placeholder = "할 일 입력";
    todoInput.classList.add("todo-input");

    this.addButton.parentNode.insertBefore(todoInput, this.addButton);
    todoInput.focus();

    const handleKeydown = (e) => {
      if (e.key === "Enter") {
        todoInput.removeEventListener("keydown", handleKeydown);
        this.addInputHandler();
      } else if (e.key === "Escape") {
        todoInput.remove();
        this.addButton.textContent = "ADD";
      }
    };

    todoInput.addEventListener("keydown", handleKeydown);
  };

  renderTodos = () => {
    this.renderer.renderTodos(this.todos);
    this.binder.bindTodoEvents();
  };
}

document.addEventListener("DOMContentLoaded", new TodoApp());
