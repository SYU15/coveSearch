import { GET_SEARCH_ENTRIES, GET_SEARCH_ENTRIES_SUCCESS, GET_SEARCH_ENTRIES_ERROR } from '../actions/searchAction';

//initial playlist is empty
const initialSearch = [];

//set state to empty playlist, will add or remove to playlist based on action
export default function search(state = initialSearch, action) {
  switch (action.type) {
    case GET_SEARCH_ENTRIES:
      return [
        ...state
      ];
    case GET_SEARCH_ENTRIES_SUCCESS:
      return action.entries;
      case GET_SEARCH_ENTRIES_ERROR:
        return [
          ...state
        ];
    default:
      return state;
  }
}
