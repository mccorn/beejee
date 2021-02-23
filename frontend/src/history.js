import { createBrowserHistory } from 'history';

export const BASE_URL = "app";
export const BASE_URL_REQ = "https://uxcandy.com/~shapoval/test-task-backend/v2";
export const USER = "mccorn";
// export const USER = "Example";

const history = createBrowserHistory({ basename: BASE_URL });

// const unlisten = history.listen((location, action) => {
//   console.log(action, location.pathname, location.state);
//   if (location.pathname === '/game/map') throw new Error();
// });

history.goBackOld = history.goBack;

history.goBack = () => {
  if (history.location.state && history.location.state.useHistory) {
    history.goBackOld();
  } else {
    history.push('/app');
  }
};

export default history;
