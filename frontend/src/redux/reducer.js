import { combineReducers } from 'redux';
import * as actions from './actionTypes';

function api(state = { busy: false, func: null, error: null }, action) {
  switch (action.type) {
    case actions.API_REQUEST_BEGIN:
      return { ...state, ...{ busy: true, func: action.payload.func, error: null } };
    case actions.API_REQUEST_END:
      return { ...state, ...{ busy: false, func: null } };
    case actions.API_REQUEST_ERROR:
      return { ...state, ...{ error: action.payload.message } };
    default:
      return state;
  }
}

function tasks(state = {  }, action) {
  if (action.type === actions.GET_TASKS) {
    return action.payload.data.tasks || state;
  }
  return state;
}

function token(state = null, action) {
  if (action.type === actions.LOGIN) {
    return action.payload.data.token || state;
  }
  return state;
}

function total_task_count(state = {  }, action) {
  if (action.type === actions.GET_TASKS) {
    return action.payload.data.total_task_count || state;
  }
  return state;
}

export default combineReducers({
  api,
  tasks,
  total_task_count,
  token,
});
