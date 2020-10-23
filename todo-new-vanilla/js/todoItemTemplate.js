function getTodoItemTemplateByTodo (todoItem) {
    const todoItemId = todoItem.id 
    const todoItemTemplate = `
        <div class="todo-list-item-content">
            <input 
                type="checkbox" 
                class="todo-item-check" 
                id="check_${todoItemId}"
                ${todoItem.status === 'finished' ? 'checked' : ''}
            >
            <span class="todo-item-text">${todoItem.name}</span>
        </div>

        <div class="todo-list-item-actions">
            <button class="button purple-background white-text" id="toggle_${todoItemId}">
                <img src="assets/checkmark.svg">
            </button>
            <button class="button orange-background" id="delete_${todoItemId}">
                <img src="assets/trash.svg">
            </button>
        </div>
    `
    return todoItemTemplate
}