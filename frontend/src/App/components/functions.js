import Api from "./Api";
import {addTask, pageData} from '../../redux/actions';

export function loadPageData(data) {
  const promise = Api.getPageData(data);
  promise.then(
    (data) => pageData(data),
    () => console.error(new Error('Ошибка загрузки данных')),
  );
  return promise;
}
