// @flow

export const get = async( url: string )=> await (await fetch(url)).json();

export const post = async (url: string, data: Object) =>
  await (await fetch(url, {
    headers: { 'content-type': 'application/json; charset=UTF-8' },
    body: JSON.stringify(data),
    method: 'POST',
  })).json();

export const put = async (url: string, data: Object) =>
  await (await fetch(url, {
    headers: { 'content-type': 'application/json; charset=UTF-8' },
    body: JSON.stringify(data),
    method: 'PUT',
  })).json();

export const del = async (url: string, data: Object) =>
  await (await fetch(url, {
    headers: { 'content-type': 'application/json; charset=UTF-8' },
    body: JSON.stringify(data),
    method: 'DELETE',
  })).json();