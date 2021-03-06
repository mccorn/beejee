import store from './store';
import * as types from './actionTypes';

export function pageData(data) {
  store.dispatch({ type: types.GET_TASKS, payload: { data: data.message } });
}

export function tokenAction(data) {
  store.dispatch({ type: types.GET_TOKEN, payload: { token: data } });
}
