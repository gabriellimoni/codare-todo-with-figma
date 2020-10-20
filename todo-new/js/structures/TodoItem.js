export default class TodoItem {
    constructor (id, name, status) {
        if (!id) throw new Error ('TodoItem needs an id')
        if (!name) throw new Error ('TodoItem needs an name')
        if (!status) throw new Error ('TodoItem needs an status')
        
        this.id = id
        this.name = name
        this.status = status
    }
}