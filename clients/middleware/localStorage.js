export const loadState = () => {
  try {
    var serializedState = localStorage.getItem('state')
    return serializedState ? JSON.parse(serializedState) : undefined
  } catch (err) {
    return false
  }
}

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch (err) {
    return false
  }
}
