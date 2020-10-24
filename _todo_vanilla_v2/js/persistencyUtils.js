function persistState (state) {
    const stringState = JSON.stringify(state)
    localStorage.setItem('state', stringState)
}

function getState () {
    const stringState = localStorage.getItem('state')
    const jsonState = JSON.parse(stringState)
    return jsonState
}