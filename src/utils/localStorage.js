export const checkLocalStorage = (name, idx) => {
  let item = localStorage.getItem(name);
  if (!item) return false;
  item = JSON.parse(item);
  item = new Set(item);
  return item.has(idx);
};

export const saveLocalStorage = (name, idx) => {
  let item = localStorage.getItem(name);
  item = item ? JSON.parse(item) : [];
  item = new Set(item);
  item.add(idx);
  item = [...item];
  localStorage.setItem(name, JSON.stringify(item));
};

export const resaveLoaclStorage = (name, idx) => {
  let item = localStorage.getItem(name);
  item = item ? JSON.parse(item) : [];
  item = new Set(item);
  if (item.has(idx)) item.delete(idx);
  item.add(idx);
  item = [...item];
  localStorage.setItem(name, JSON.stringify(item));
}

export const deleteLocalStorage = (name, idx) => {
  let item = localStorage.getItem(name);
  if (item) {
    item = JSON.parse(item);
    item = item.filter((i) => i !== idx);
    localStorage.setItem(name, JSON.stringify(item));
  }
};

export const clearLocalStorage = (name) => {
  localStorage.removeItem(name);
}
