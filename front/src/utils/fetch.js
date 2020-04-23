import fetch from 'isomorphic-fetch';
import { stringify } from 'query-string';

const request = (url, options) => {
  const newOptions = {
    // credentials: "include",
    credentials: 'same-origin',
    mode: 'cors',
    ...options,
    headers: {
      'x-requested-with': 'XMLHttpRequest',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(options.headers || {}),
    },
  };
  return fetch(url, newOptions).then(response => response.json());
};

const get = (url, data, config = {}) =>
  request(
    `${url}?${stringify(data)}`,
    {
      method: 'GET',
    },
    config,
  );

const post = (url, data, config = {}) =>
  request(
    url,
    {
      method: 'POST',
      body: JSON.stringify(data),
    },
    config,
  );

const del = (url, data, config = {}) =>
  request(
    url,
    {
      method: 'DELETE',
      body: JSON.stringify(data),
    },
    config,
  );

const put = (url, data, config = {}) =>
  request(
    url,
    {
      method: 'PUT',
      body: JSON.stringify(data),
    },
    config,
  );

export { fetch, get, post, del,put };
