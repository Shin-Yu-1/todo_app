export class TodoRenderer {
  constructor(container) {
    this.container = container;
  }

  createElement(type, parent, option) {
    const element = document.createElement(type);

    if (option) {
      for (const [key, value] of Object.entries(option)) {
        if (key === "classList" && typeof value === "object") {
          const { method, className } = value;
          element.classList[method](...className);
        } else {
          element[key] = value;
        }
      }
    }

    if (parent) {
      parent.appendChild(element);
    }

    return element;
  }

  renderTodos(todos) {
    this.container.innerHTML = "";

    return todos.map((todo, index) => {
      const listItem = this.createElement("div", this.container, {
        className: "list-item",
      });
      listItem.dataset.id = new Date().getTime();
      const listFirstChild = this.createElement("div", listItem);
      const buttonLayout = this.createElement("div", listItem, {
        className: "button-layout",
      });
      const checkbox = this.createElement("input", listFirstChild, {
        type: "checkbox",
        checked: todo.isComplete,
        className: "todo-checkbox",
      });
      let textItem = null;

      if (todo.editable) {
        textItem = this.createElement("input", listFirstChild, {
          type: "text",
          value: todo.text,
          className: "todo-edit-input",
        });
      } else {
        textItem = this.createElement("span", listFirstChild, {
          textContent: todo.text,
          classList: {
            method: todo.isComplete ? "add" : "remove",
            className: ["checked"],
          },
        });
      }

      const editButton = this.createElement("button", buttonLayout, {
        textContent: todo.editable ? "Save" : "Edit",
        className: "edit-button",
      });
      editButton.innerHTML = todo.editable
        ? `
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
          <path d="M5 5v14h14V5H5zM9 3v4h6V3M9 13h6v6H9z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `
        : `
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="none"
          viewBox="0 0 24 24">
          <path d="M12 20h9" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `;
      const deleteButton = this.createElement("button", buttonLayout, {
        textContent: "Delete",
        className: "delete-button",
      });
      deleteButton.innerHTML = `
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="none"
          viewBox="0 0 24 24">
          <path d="M6 7h12M9 7V4h6v3M10 11v6M14 11v6M5 7h14l-1 13H6L5 7z"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      `;

      return {
        checkbox,
        editButton,
        deleteButton,
        textItem,
        listItem,
        index,
      };
    });
  }
}
