/* eslint-disable no-console */
import $ from 'jquery';
import {BASE_URL_REQ, USER} from '../../../history';

const ApiInt = {
  apiIsBusy: false,
  ajaxGet: (func, data) => {
    let form = new FormData();
    Object.keys(data).forEach((id) => {
      form.append(id, data[id]);
    });

    return new Promise((resolve, reject) => {
      $.get(
        `${BASE_URL_REQ}/${func}`,
        {
          developer: USER,
          ...data,
        })
        .done((resp) => {
          if (resp.status === "ok") {
            resolve(resp);
          } else {
            resolve(resp);
          }
        })
    });
  },
  ajaxReq: (func, data) => {
    let form = new FormData();
    Object.keys(data).forEach((id) => {
      form.append(id, data[id]);
    });

    return new Promise((resolve, reject) => {
      $.ajax({
        type: 'POST',
        developer: USER,

        data: form,
        url: `${BASE_URL_REQ}/${func}?developer=${USER}`,
        crossDomain: true,
        method: 'POST',
        mimeType: "multipart/form-data",
        contentType: false,
        processData: false,
        dataType: "json",
      })
        .done((resp) => {
          if (resp.status === "ok") {
            resolve(resp.message.token);
          } else {
            reject(resp.message);
          }
        })
    });
  },
  ajaxReqEdit: (func, data) => {

    let form = new FormData();
    Object.keys(data).forEach((id) => {
      form.append(id, data[id]);
    });

    return new Promise((resolve, reject) => {
      $.ajax({
        type: 'POST',
        developer: USER,

        data: form,
        url: `${BASE_URL_REQ}/${func}/${data.id}?developer=${USER}`,
        crossDomain: true,
        method: 'POST',
        mimeType: "multipart/form-data",
        contentType: false,
        processData: false,
        dataType: "json",
      })
        .done((resp) => {
          if (resp.status === "ok") {
            resolve(resp);
          } else {
            resolve(resp);
          }
        })
    });
  },
  ajaxReqCreate: (func, data) => {
    let form = new FormData();
    Object.keys(data).forEach((id) => {
      form.append(id, data[id]);
    });

    return new Promise((resolve, reject) => {
      $.ajax({
        type: 'GET',
        developer: USER,

        url: `${BASE_URL_REQ}/${func}?developer=${USER}`,
        crossDomain: true,
        method: 'POST',
        mimeType: "multipart/form-data",
        contentType: false,
        processData: false,
        data: form,
        dataType: "json",
      })
        .done((resp) => {
          if (resp.status === "ok") {
            resolve(resp);
          } else {
            resolve(resp);
          }
        })
    });
  },
};

export default ApiInt;
