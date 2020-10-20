/**
 * TodoItem: {
 *   id,
 *   name,
 *   status
 * }
 */
let todoItems = []

export function addTodo(listId, todoItem) {
    todoItems.push(todoItem)
    _renderAllTodos(listId)
}

function _renderAllTodos(listId) {
    const listElement = document.getElementById(listId)
    listElement.innerHTML = ''

    todoItems.forEach(todoItem => {
        const listItemElement = document.createElement('li')
        listItemElement.className = 'todo-list-item'
        listItemElement.id = todoItem.id

        const newItemTemplate = `
            <div class="todo-list-item-content">
                <input type="checkbox" class="todo-item-check">
                <span class="todo-item-text">${todoItem.name}</span>
            </div>

            <div class="todo-list-item-actions">
                <button class="button purple-background white-text">
                    <img src="assets/checkmark.svg">
                </button>
                <button class="button orange-background">
                    <img src="assets/trash.svg">
                </button>
            </div>
        `
        listItemElement.innerHTML = newItemTemplate
        listElement.append(listItemElement)
    })
}