export default class LocalStoragePersistency {
    constructor () {}

    saveState (jsonData) {
        try {
            const stateData = JSON.stringify(jsonData)
            localStorage.setItem('state', stateData)
        } catch (error) {
            // ignore
        }
    }

    loadState () {
        try {
            const stateStringData = localStorage.getItem('state')
            const stateJsonData = JSON.parse(stateStringData)
            return stateJsonData
        } catch (error) {
            // ignore
        }
    }
}