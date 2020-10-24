function getTodoItemTemplateByTodo (todoItem) {
    return `
        <div class="todo-list-item-content">
            <input 
                type="checkbox" 
                class="todo-item-check" 
                id="check_${todoItem.id}"
                ${todoItem.status === 'finished' ? 'checked' : ''}
            >
            <span class="todo-item-text">${todoItem.name}</span>
        </div>

        <div class="todo-list-item-actions">
            <button class="button purple-background" id="toggle_${todoItem.id}">
                <img src="assets/checkmark.svg">
            </button>
            <button class="button orange-background" id="trash_${todoItem.id}">
                <img src="assets/trash.svg">
            </button>
        </div>
    `
}