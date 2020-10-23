function persistState (jsonState) {
    const stringStateData = JSON.stringify(jsonState)
    localStorage.setItem('state', stringStateData)
}

function getState () {
    const stringStateData = localStorage.getItem('state')
    const jsonState = JSON.parse(stringStateData)
    return jsonState
}