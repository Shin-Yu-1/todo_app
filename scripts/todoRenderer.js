export class TodoRenderer {
  constructor(container) {
    this.container = container;
  }

  getElement = (type, parent = null, option = null) => {
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
  };

  renderTodos = (todos) => {
    this.container.innerHTML = "";

    return todos.map((todo, index) => {
      const listItem = this.getElement("div", this.container, {
        className: "list-item",
      });
      const listFirstChild = this.getElement("div", listItem);
      const listSecondChild = this.getElement("div", listItem);
      const checkbox = this.getElement("input", listFirstChild, {
        type: "checkbox",
        checked: todo.isComplete,
        className: "todo-checkbox",
      });
      let textItem = null;

      if (todo.editable) {
        textItem = this.getElement("input", listFirstChild, {
          type: "text",
          value: todo.text,
          className: "todo-edit-input",
        });
      } else {
        textItem = this.getElement("span", listFirstChild, {
          textContent: todo.text,
          classList: {
            method: todo.isComplete ? "add" : "remove",
            className: ["checked"],
          },
        });
      }

      const editButton = this.getElement("button", listSecondChild, {
        textContent: todo.editable ? "Save" : "Edit",
        className: "edit-button",
      });
      const deleteButton = this.getElement("button", listSecondChild, {
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
  };
}
