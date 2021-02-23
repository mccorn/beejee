import ApiInt from './api';

const Api = {
  getPageData: ({sort_field, sort_direction, page}) => ApiInt.ajaxReq('/', { sort_field, sort_direction, page}),
  create: ({username, email, text}) => ApiInt.ajaxReqCreate('create', {username, email, text}),
  login: ({username, password}) => ApiInt.ajaxReq('login', { username, password }),
  edit: ({token}) => ApiInt.ajaxReq('edit', { token }),
};

export default Api;
