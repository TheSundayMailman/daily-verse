import {
  API_BASE_URL,
  REACT_APP_NASA_API_KEY
} from '../config.js';

export const FETCH_POD_REQUEST = 'FETCH_POD_REQUEST';
export const fetchPODRequest = () => {
  return { type: FETCH_POD_REQUEST };
};

export const FETCH_POD_SUCCESS = 'FETCH_POD_SUCCESS';
export const fetchPODSuccess = (result, inputDate) => {
  let date = result.date ? result.date : inputDate;
  let copyright = result.copyright ? result.copyright : 'Public Domain';
  return {
    type: FETCH_POD_SUCCESS,
    currentPOD: {
      date,
      title: result.title,
      copyright,
      explanation: result.explanation,
      media_type: result.media_type,
      url: result.url,
      hdurl: result.hdurl,
    }
  };
};

export const FETCH_POD_ERROR = 'FETCH_POD_ERROR';
export const fetchPODError = error => {
  return {
    type: FETCH_POD_ERROR,
    error
  };
};

export const fetchPOD = inputDate => (dispatch, getState) => {
  dispatch(fetchPODRequest());
  return fetch(
    `${API_BASE_URL}?api_key=${REACT_APP_NASA_API_KEY}&date=${inputDate}&hd=true`,
    { method: 'GET' }
  )
  .then(res => res.json())
  .then(result => dispatch(fetchPODSuccess(result, inputDate)))
  .catch(err =>  dispatch(fetchPODError(err)));
};
