const defaultState = {
  trails: []
}

export default function TrailReducer(prevState = defaultState, action) {
  switch(action.type) {
    case "SET_TRAILS":
      return {
        ...prevState,
        trails: action.payload
      }
    default: {
      return prevState
    }
  }
}