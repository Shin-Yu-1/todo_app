export class EventBinder {
  constructor(service, renderTodos, container) {
    this.service = service;
    this.onUpdateUI = renderTodos;
    this.container = container;
  }

  bindTodoEvents() {
    this.container.addEventListener("click", (e) => {
      const { target } = e;
      const listItem = target.closest(".list-item");
      const index = Array.from(this.container.children).indexOf(listItem);

      if (index < 0) return;

      if (target.closest(".edit-button")) {
        const todo = this.service.getTodos();
        this.service.toggleEdit(index);

        if (todo[index] && !todo[index].editable) {
          const textItem = listItem.querySelector(".todo-edit-input");
          const newText = textItem.value.trim();

          this.service.updateTodo({ index, newText });
        }

        this.onUpdateUI();
      }

      if (target.closest(".delete-button")) {
        this.service.deleteTodo(index);
        this.onUpdateUI();
      }

      if (target.closest(".todo-checkbox")) {
        this.service.updateTodo({ index, isComplete: target.checked });

        this.onUpdateUI();
      }
    });
  }
}
