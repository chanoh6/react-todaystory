export const checkLocalStorage = (key, value) => {
  let data = localStorage.getItem(key);
  if (!data) return false;
  data = JSON.parse(data);
  data = new Set(data);
  return data.has(value);
};

export const saveLocalStorage = (key, value) => {
  let data = localStorage.getItem(key);
  data = data ? JSON.parse(data) : [];
  data = new Set(data);
  data.add(value);
  data = [...data];
  localStorage.setItem(key, JSON.stringify(data));
};

export const resaveLoaclStorage = (key, value) => {
  let data = localStorage.getItem(key);
  data = data ? JSON.parse(data) : [];
  data = new Set(data);
  if (data.has(value)) data.delete(value);
  data.add(value);
  data = [...data];
  localStorage.setItem(key, JSON.stringify(data));
};

export const deleteLocalStorage = (key, value) => {
  let data = localStorage.getItem(key);
  if (data) {
    data = JSON.parse(data);
    data = data.filter((i) => i !== value);
    localStorage.setItem(key, JSON.stringify(data));
  }
};

export const clearLocalStorage = (key) => {
  localStorage.removeItem(key);
};

export const getLocalStorage = (key) => {
  let data = localStorage.getItem(key);
  data = data ? JSON.parse(data) : [];
  data = [...data];
  return data;
};
