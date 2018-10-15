import {
  FETCH_POD_REQUEST,
  FETCH_POD_SUCCESS,
  FETCH_POD_ERROR
} from '../actions/pod.js';

const initialState = {
  currentPOD: {
    date: '',
    title: '',
    copyright: '',
    explanation: '',
    media_type: '',
    url: '',
    hdurl: ''
  },
  loading: true,
  error: null
};

export function podReducer(state=initialState, action) {
  if (action.type === FETCH_POD_REQUEST) {
    return {
      ...state,
      loading: true,
      error: null
    };
  }
  if (action.type === FETCH_POD_SUCCESS) {
    return {
      ...state,
      currentPOD: {...action.currentPOD},
      loading: false,
      error: null
    };
  }
  if (action.type === FETCH_POD_ERROR) {
    return {
      ...state,
      loading: false,
      error: true,
    };
  }
  return state;
}
