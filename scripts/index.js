import { TodoService } from "./todoService.js";
import { TodoRenderer } from "./todoRenderer.js";
import { EventBinder } from "./eventBinder.js";

class TodoApp {
  constructor() {
    this.container = document.getElementById("list");

    this.service = new TodoService();
    this.renderer = new TodoRenderer(this.container);

    this.addButton = document.querySelector('[class="add-button"]');
    this.addButton.addEventListener("click", this.showModal.bind(this));

    this.binder = new EventBinder(
      this.service,
      this.renderTodos.bind(this),
      this.container
    );

    this.renderTodos();
  }

  get todos() {
    return this.service.getTodos();
  }

  renderTodos() {
    this.renderer.renderTodos(this.todos);
    this.binder.bindTodoEvents();
  }

  showModal() {
    const modal = document.createElement("div");
    modal.className = "modal";

    modal.innerHTML = `
      <div class="modal-content">
        <h2>할 일 추가</h2>
        <input type="text" placeholder="할 일 입력" class="todo-modal-input" />
        <div class="modal-actions">
          <button class="save-button">
            <svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24">
              <path d="M5 13l4 4L19 7"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </button>
          <button class="cancel-button">
          <svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    const input = modal.querySelector(".todo-modal-input");
    input.focus();

    const removeModal = () => modal.remove();

    modal.querySelector(".save-button").addEventListener("click", () => {
      const text = input.value.trim();
      if (text) {
        this.service.addTodo({ text });
        this.renderTodos();
      }
      removeModal();
    });

    modal
      .querySelector(".cancel-button")
      .addEventListener("click", removeModal);

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        modal.querySelector(".save-button").click();
      } else if (e.key === "Escape") {
        removeModal();
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", () => new TodoApp());
