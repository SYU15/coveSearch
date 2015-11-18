import { GET_SEARCH_ENTRIES, GET_SEARCH_ENTRIES_SUCCESS, GET_SEARCH_ENTRIES_ERROR } from '../actions/searchAction';

//initial playlist is empty
const initialSearch = [];

//set state to empty playlist, will add or remove to playlist based on action
export default function playlists(state = initialSearch, action) {
  switch (action.type) {
    case GET_SEARCH_ENTRIES:
      return [
        {
          id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
          audioUrl: action.audioUrl
        }, 
        ...state
      ];
    case GET_SEARCH_ENTRIES_SUCCESS:
      return [
        {
          id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
          audioUrl: action.audioUrl
        }, 
        ...state
      ];
      case GET_SEARCH_ENTRIES_ERROR:
        return [
          {
            id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
            audioUrl: action.audioUrl
          }, 
          ...state
        ];
    default:
      return state;
  }
}
