export class EventBinder {
  constructor(service, renderTodos, container) {
    this.service = service;
    this.onUpdateUI = renderTodos;
    this.container = container;

    this.filter = "all";
    this.sort = "latest";
  }

  bindStarRatingEvents(starContainer) {
    starContainer.addEventListener("click", (e) => {
      const { target } = e;

      const selectedPriority = Number(target.dataset.value);

      starContainer.querySelectorAll("span").forEach((star, i) => {
        star.classList.toggle("star", i < selectedPriority);
      });

      starContainer.dataset.value = selectedPriority;
    });
  }

  bindFilterEvents() {
    const selectBoxes = document.querySelectorAll(".custom-select");

    selectBoxes.forEach((filterSelector, idx) => {
      const selected = filterSelector.querySelector(".selected");
      const options = filterSelector.querySelector(".options");

      filterSelector.addEventListener("click", (e) => {
        e.stopPropagation();
        const isOpen = options.style.display === "block";

        document.querySelectorAll(".options").forEach((o) => {
          o.style.display = "none";
        });

        options.style.display = isOpen ? "none" : "block";
      });

      options.addEventListener("click", (e) => {
        e.stopPropagation();
        const option = e.target.closest(".option");
        if (!option) return;

        const value = option.dataset.value;
        const label = option.textContent;

        filterSelector.dataset.value = value;
        selected.textContent = label;

        options
          .querySelectorAll(".option")
          .forEach((o) => o.classList.remove("selected"));
        option.classList.add("selected");

        options.style.display = "none";

        if (idx === 0) this.filter = value;
        if (idx === 1) this.sort = value;

        this.onUpdateUI();
      });

      document.addEventListener("click", (e) => {
        if (!filterSelector.contains(e.target)) {
          options.style.display = "none";
        }
      });
    });
  }

  bindTodoEvents() {
    this.container.addEventListener("click", (e) => {
      const { target } = e;
      const listItem = target.closest(".list-item");
      const index = Array.from(this.container.children).indexOf(listItem);
      const id = listItem?.dataset.id;

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
        // const index = this.todos.findIndex((todo) => todo.id === id);

        if (index > -1) {
          const todos = this.service.getTodos();
          todos.splice(index, 1);
          this.service.saveTodos(todos);

          this.onUpdateUI();
        }
      }

      if (target.closest(".todo-checkbox")) {
        this.service.updateTodo({ index, isComplete: target.checked });

        this.onUpdateUI();
      }
    });
  }
}
