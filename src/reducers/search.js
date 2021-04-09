import  {SEARCH_QUERY} from '../actions/types'


export const search = (state = { text: "" }, action) => {
    switch (action.type) {
      case SEARCH_QUERY:
        return { ...state, ...action.payload };
      default:
        return state;
    }
  };
  