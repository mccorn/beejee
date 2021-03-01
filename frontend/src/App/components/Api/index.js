import ApiInt from './api';

const Api = {
  getPageData: ({sort_field, sort_direction, page}) => ApiInt.ajaxGet('/', { sort_field, sort_direction, page}),
  create: ({username, email, text}) => ApiInt.ajaxReqCreate('create', {username, email, text}),
  login: ({username, password}) => ApiInt.ajaxReq('login', { username, password }),
  edit: ({ id, username, email, text, status, token}) => ApiInt.ajaxReqEdit('edit', { id, username, email, text, status, token }),
};

export default Api;
