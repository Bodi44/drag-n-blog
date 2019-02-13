export const get = async url => await (await fetch(url)).json();

export const post = async (url, data) =>
  await (await fetch(url, {
    headers: { 'content-type': 'application/json; charset=UTF-8' },
    body: JSON.stringify(data),
    method: 'POST',
  })).json();

export const put = async (url, data) =>
  await (await fetch(url, {
    headers: { 'content-type': 'application/json; charset=UTF-8' },
    body: JSON.stringify(data),
    method: 'PUT',
  })).json();

export const del = async (url, data) =>
  await (await fetch(url, {
    headers: { 'content-type': 'application/json; charset=UTF-8' },
    body: JSON.stringify(data),
    method: 'DELETE',
  })).json();