export class TodoRenderer {
  constructor(container) {
    this.container = container;
  }

  static createElement(type, parent, option) {
    const element = document.createElement(type);

    if (option) {
      Object.entries(option).forEach(([key, value]) => {
        if (key === 'classList' && typeof value === 'object') {
          const { method, className } = value;
          element.classList[method](...className);
        } else {
          element[key] = value;
        }
      });
    }

    if (parent) {
      parent.appendChild(element);
    }

    return element;
  }

  static renderStarRating(starContainer, selectedPriority, disableHover) {
    const stars = TodoRenderer.createElement('div', starContainer, {
      // className: 'stars'
      classList: {
        method: 'add',
        className: ['stars', disableHover ? 'disable-hover' : '']
      }
    });

    for (let i = 1; i <= 5; i += 1) {
      const star = TodoRenderer.createElement('span', stars, {
        className: selectedPriority >= i ? 'star' : '',
        textContent: '*'
      });
      star.dataset.value = i;
    }

    return stars;
  }

  renderTodos(todos) {
    this.container.innerHTML = '';

    return todos.map((todo, index) => {
      const listItem = TodoRenderer.createElement('div', this.container, {
        className: 'list-item'
      });
      listItem.dataset.id = todo.id;
      const listFirstChild = TodoRenderer.createElement('div', listItem);
      const mainLine = TodoRenderer.createElement('div', listFirstChild, {
        className: 'todo-main-line'
      });
      const buttonLayout = TodoRenderer.createElement('div', listItem, {
        className: 'button-layout'
      });

      const checkbox = TodoRenderer.createElement('input', mainLine, {
        type: 'checkbox',
        checked: todo.isComplete,
        className: 'todo-checkbox'
      });
      let textItem = null;

      if (todo.editable) {
        textItem = TodoRenderer.createElement('input', mainLine, {
          type: 'text',
          value: todo.text,
          className: 'todo-edit-input'
        });
      } else {
        textItem = TodoRenderer.createElement('span', mainLine, {
          textContent: todo.text,
          classList: {
            method: todo.isComplete ? 'add' : 'remove',
            className: ['checked']
          }
        });
      }

      const dateText = new Date(todo.saveAt).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
      TodoRenderer.createElement('span', listFirstChild, {
        textContent: dateText,
        className: 'todo-date'
      });

      const disableHover = true;
      TodoRenderer.renderStarRating(buttonLayout, todo.priority, disableHover);
      const editButton = TodoRenderer.createElement('button', buttonLayout, {
        textContent: todo.editable ? 'Save' : 'Edit',
        className: 'edit-button'
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
      const deleteButton = TodoRenderer.createElement('button', buttonLayout, {
        textContent: 'Delete',
        className: 'delete-button'
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
        index
      };
    });
  }
}
