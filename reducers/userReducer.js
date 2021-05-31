const defaultState = {
  location: null
}

export default function userReducer(prevState = defaultState, action) {
  switch(action.type) {
    case 'SET_LOCATION':
      return {
        ...prevState,
        location: action.payload
      }
    default:
      return prevState
  }
}