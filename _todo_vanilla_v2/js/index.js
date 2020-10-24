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

        const toggleTodoButtonElement = itemElement.querySelector(`#toggle_${todoItem.id}`)
        toggleTodoButtonElement.onclick = () => {
            handleToggleTodoStatusById(todoItem.id)
        }

        const toggleTodoCheckElement = itemElement.querySelector(`#check_${todoItem.id}`)
        toggleTodoCheckElement.onclick = () => handleToggleTodoStatusById(todoItem.id)

        listElement.append(itemElement)
    })

    persistState(todosList)
}

function handleDeleteTodoById (todoId) {
    const todosListOnlyIds = todosList.map(function (todoItem) {
        return todoItem.id
    })

    const indexToDelete = todosListOnlyIds.indexOf(todoId)

    todosList.splice(indexToDelete, 1)

    render()
}

function handleToggleTodoStatusById (todoId) {
    const todoToToggle = todosList.find(function (todoItem) {
        return todoItem.id === todoId
    })

    if (todoToToggle.status === 'pending') {
        todoToToggle.status = 'finished'
    } else {
        todoToToggle.status = 'pending'
    }

    render()
}

window.onload = function () {
    const state = getState()
    todosList = state
    render()
}