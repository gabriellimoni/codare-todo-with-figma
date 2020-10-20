/**
 * TodoItem: {
 *   id,
 *   name,
 *   status
 * }
 */
let todoItems = []

export function initialize(listId) {
    try {
        const stateStringData = localStorage.getItem('state')
        const stateJsonData = JSON.parse(stateStringData)
        todoItems = stateJsonData
        _renderAllTodos(listId)
    } catch (error) {
        // Ignora erros provenientes de parsing
    }
}

export function addTodo(listId, todoItem) {
    todoItems.push(todoItem)
    _renderAllTodos(listId)
}

function _removeTodo(listId, todoItemId) {
    const todoIndex = todoItems.map(todoItem => todoItem.id).indexOf(todoItemId)
    todoItems.splice(todoIndex, 1)
    _renderAllTodos(listId)
}

function _toggleTodoStatus(listId, todoItemId) {
    const todoToToggle = todoItems.filter(todoItem => todoItem.id === todoItemId)[0]
    if (!todoToToggle) return
    todoToToggle.status = todoToToggle.status === 'pending' ? 'done' : 'pending'
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
                <input 
                  type="checkbox" 
                  class="todo-item-check" 
                  ${todoItem.status === 'done' ? 'checked' : ''}
                  id="check_${todoItem.id}"
                >
                <span class="todo-item-text">${todoItem.name}</span>
            </div>

            <div class="todo-list-item-actions">
                <button class="button purple-background white-text" id="toggle_${todoItem.id}">
                    <img src="assets/checkmark.svg">
                </button>
                <button class="button orange-background" id="delete_${todoItem.id}">
                    <img src="assets/trash.svg">
                </button>
            </div>
        `
        listItemElement.innerHTML = newItemTemplate
        listElement.append(listItemElement)

        const removeButton = document.getElementById(`delete_${todoItem.id}`)
        removeButton.onclick = () => _removeTodo(listId, todoItem.id)
        
        const toggleButton = document.getElementById(`toggle_${todoItem.id}`)
        toggleButton.onclick = () => _toggleTodoStatus(listId, todoItem.id)
        const toggleCheckbox = document.getElementById(`check_${todoItem.id}`)
        toggleCheckbox.onclick = () => _toggleTodoStatus(listId, todoItem.id)
    })

    _saveAllToLocalStorage()
}

function _saveAllToLocalStorage () {
    const dataToSave = JSON.stringify(todoItems)
    localStorage.setItem('state', dataToSave)
}