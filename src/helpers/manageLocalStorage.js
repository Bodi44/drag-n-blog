export const updateLocalStorage = (data, storageName) =>
  localStorage.setItem(storageName, JSON.stringify(data))
