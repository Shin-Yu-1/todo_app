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
      const listSecondChild = this.createElement("div", listItem);
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

      const editButton = this.createElement("button", listSecondChild, {
        textContent: todo.editable ? "Save" : "Edit",
        className: "edit-button",
      });
      const deleteButton = this.createElement("button", listSecondChild, {
        textContent: "Delete",
        className: "delete-button",
      });

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
