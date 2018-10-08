import {
  FETCH_POD_REQUEST,
  FETCH_POD_SUCCESS,
  FETCH_POD_ERROR
} from '../actions/pod.js';

const initialState = {
  date: '',
  title: '',
  copyright: '',
  explanation: '',
  media_type: '',
  url: '',
  hdurl: '',
  loading: true,
  error: null
};

export function podReducer(state=initialState, action) {
  if (action.type === FETCH_POD_REQUEST) {
    return {
      ...state,
      loading: true
    };
  }
  if (action.type === FETCH_POD_SUCCESS) {
    return {
      ...state,
      date: action.date,
      title: action.title,
      copyright: action.copyright,
      explanation: action.explanation,
      media_type: action.media_type,
      url: action.url,
      hdurl: action.hdurl,
      loading: false,
    };
  }
  if (action.type === FETCH_POD_ERROR) {
    return {
      ...state,
      error: true,
    };
  }
  return state;
}
