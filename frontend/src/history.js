import { createBrowserHistory } from 'history';

export const BASE_URL = "app";
export const BASE_URL_REQ = "https://uxcandy.com/~shapoval/test-task-backend/v2";
export const USER = "mccorn";

const history = createBrowserHistory({ basename: BASE_URL });

history.goBackOld = history.goBack;

history.goBack = () => {
  if (history.location.state && history.location.state.useHistory) {
    history.goBackOld();
  } else {
    history.push('/app');
  }
};

export default history;
