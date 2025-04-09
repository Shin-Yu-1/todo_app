export class TodoService {
  constructor() {
    this.todos = JSON.parse(localStorage.getItem("todos")) || [];
  }

  getTodos() {
    return this.todos;
  }

  saveTodos(todos) {
    return localStorage.setItem("todos", JSON.stringify(todos || this.todos));
  }

  addTodo({ text, priority, saveAt }) {
    this.todos.push({
      text,
      editable: false,
      priority,
      isComplete: false,
      saveAt,
      id: new Date().getTime(),
    });
    this.saveTodos();
  }

  deleteTodo(index) {
    this.todos.splice(index, 1);
    this.saveTodos();
  }

  toggleEdit(index) {
    if (this.todos[index]) {
      this.todos[index].editable = !this.todos[index].editable;
      this.saveTodos();
    }
  }

  updateTodo({ index, newText, priority, isComplete }) {
    if (newText) {
      this.todos[index].text = newText;
    }

    if (isComplete !== undefined) {
      this.todos[index].isComplete = isComplete;
    }

    if (priority !== undefined) {
      this.todos[index].priority = priority;
    }

    this.saveTodos();
  }

  deleteTodo(index) {
    this.todos.splice(index, 1);
    this.saveTodos();
  }
}
