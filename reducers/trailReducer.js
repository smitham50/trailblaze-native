import { 
  filterByLength, 
  filterByDifficulty 
} from '../utils/searchFilters'; 

const defaultState = {
  trails: [],
  displayedTrails: []
}

export default function TrailReducer(prevState = defaultState, action) {
  switch(action.type) {
    case "SET_TRAILS":
      return {
        ...prevState,
        trails: action.payload,
        displayedTrails: action.payload
      }
    case "FILTER_BY_LENGTH":
      return {
        ...prevState,
        displayedTrails: filterByLength([...prevState.trails])
      }
    case "FILTER_BY_DIFFICULTY":
      return {
        ...prevState,
        displayedTrails: filterByDifficulty([...prevState.trails])
      }
    default: {
      return prevState
    }
  }
}