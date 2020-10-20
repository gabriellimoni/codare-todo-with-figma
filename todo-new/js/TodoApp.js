import TodoItem from './structures/TodoItem.js'

export default class TodoApp {
    _listElement = ''
    _persistencyService = null
    _todoItems = []

    constructor(listId, persistencyService) {
        this._listElement = document.getElementById(listId)
        this._persistencyService = persistencyService
    }

    initialize() {
        this._todoItems = this._persistencyService.loadState() || []
        this._renderAllTodos()
    }

    _renderAllTodos() {
        this._listElement.innerHTML = ''

        this._todoItems.forEach(todoItem => {
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
            this._listElement.append(listItemElement)

            const removeButton = document.getElementById(`delete_${todoItem.id}`)
            removeButton.onclick = () => this._removeTodo(todoItem.id)
            
            const toggleButton = document.getElementById(`toggle_${todoItem.id}`)
            toggleButton.onclick = () => this._toggleTodoStatus(todoItem.id)
            const toggleCheckbox = document.getElementById(`check_${todoItem.id}`)
            toggleCheckbox.onclick = () => this._toggleTodoStatus(todoItem.id)
        })

        this._persistencyService.saveState(this._todoItems)
    }

    
    _removeTodo(todoItemId) {
        const todoIndex = this._todoItems.map(todoItem => todoItem.id).indexOf(todoItemId)
        this._todoItems.splice(todoIndex, 1)
        this._renderAllTodos()
    }
    
    _toggleTodoStatus(todoItemId) {
        const todoToToggle = this._todoItems.filter(todoItem => todoItem.id === todoItemId)[0]
        if (!todoToToggle) return
        todoToToggle.status = todoToToggle.status === 'pending' ? 'done' : 'pending'
        this._renderAllTodos()
    }

    createTodoByName(name) {
        return new TodoItem(Date.now(), name, 'pending')
    }

    addTodo(todoItem) {
        this._todoItems.push(todoItem)
        this._renderAllTodos()
    }
}