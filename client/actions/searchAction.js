import fetch from 'isomorphic-fetch';

export const GET_SEARCH_ENTRIES = 'GET_SEARCH_ENTRIES';
export const GET_SEARCH_ENTRIES_SUCCESS = 'GET_SEARCH_ENTRIES_SUCCESS';
export const GET_SEARCH_ENTRIES_ERROR = 'GET_SEARCH_ENTRIES_ERROR';


//two main actions for adding/removing audio from playlist store
export function getSearchEntries(query) {
  return {
    type: GET_SEARCH_ENTRIES,
    query
  };
}

export function retrieveEntries(json) {
  return {
    type: GET_SEARCH_ENTRIES_SUCCESS,
    entries: json
  }
}

export function errorEntries(error) {
  return {
    type: GET_SEARCH_ENTRIES_ERROR,
    error: error
  }
}

export function fetchEntries(query) {
  return function(dispatch) {
    
    dispatch(getSearchEntries(query));
    
    var searchUrl = '/search?keywords=' + query;
    
    return fetch(searchUrl)
           .then(response => response.json)
           .then(json => dispatch(retrieveEntries(json)))
           .catch(error => dispatch(errorEntries(error)));
  };
}
