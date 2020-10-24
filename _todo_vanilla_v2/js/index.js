// armazena todos os items para processamento
let todosList = []
const inputElement = document.getElementById('TodoInput')

inputElement.onkeydown = function (event) {
    if (event.key === 'Enter') handleAddTodo()
}

function handleAddTodo () {
    const inputValue = inputElement.value

    if (inputValue === '') return

    const newTodo = {
        id: Date.now(),
        name: inputValue,
        status: 'pending'
    }
    todosList.push(newTodo)

    render()
    inputElement.value = ''
}

// Sempre que chamada, essa função renderiza
// todos os objetos da lista "todosList"
function render () {
    const listElement = document.getElementById('TodoList')
    listElement.innerHTML = ''

    todosList.forEach(function (todoItem) {
        const itemElement = document.createElement('li')
        itemElement.className = 'todo-list-item'
        itemElement.id = todoItem.id
        itemElement.innerHTML = getTodoItemTemplateByTodo(todoItem)
        
        const deleteTodoButtonElement = itemElement.querySelector(`#trash_${todoItem.id}`)
        deleteTodoButtonElement.onclick = function () {
            handleDeleteTodoById(todoItem.id)
        }

        listElement.append(itemElement)
    })
}

function getTodoItemTemplateByTodo (todoItem) {
    return `
        <div class="todo-list-item-content">
            <input type="checkbox" class="todo-item-check" id="check_${todoItem.id}">
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

function handleDeleteTodoById (todoId) {
    const todosListOnlyIds = todosList.map(function (todoItem) {
        return todoItem.id
    })

    const indexToDelete = todosListOnlyIds.indexOf(todoId)

    todosList.splice(indexToDelete, 1)

    render()
}