// 로컬 스토리지 가져오기
export const getLocalStorage = (key) => {
  let data = localStorage.getItem(key);
  data = data ? JSON.parse(data).map((str) => str.replace(/&f=widget/g, '')) : []; // .map((str) => str.replace(/&f=widget/g, '')) 추가 &f=widget 문자열 제거 (임시)
  data = [...new Set(data)]; // new Set(data) 중복 제거 (임시)
  return data;
};

// 로컬 스토리지 체크
export const checkLocalStorage = (key, value) => {
  let data = localStorage.getItem(key);
  if (!data) return false;
  data = JSON.parse(data).map((str) => str.replace(/&f=widget/g, '')); // .map((str) => str.replace(/&f=widget/g, '')) 추가 &f=widget 문자열 제거 (임시)
  data = new Set(data);
  return data.has(value);
};

// 로컬 스토리지 저장
export const saveLocalStorage = (key, value) => {
  let data = localStorage.getItem(key);
  data = data ? JSON.parse(data).map((str) => str.replace(/&f=widget/g, '')) : []; // .map((str) => str.replace(/&f=widget/g, '')) 추가 &f=widget 문자열 제거 (임시)
  data = new Set(data);
  data.add(value.replace(/&f=widget/g, '')); // 저장할 때도 &f=widget 문자열 제거 (임시)
  data = [...data];
  localStorage.setItem(key, JSON.stringify(data));
};

// 로컬 스토리지 재저장(순서 변경)
export const resaveLoaclStorage = (key, value) => {
  let data = localStorage.getItem(key);
  data = data ? JSON.parse(data).map((str) => str.replace(/&f=widget/g, '')) : []; // .map((str) => str.replace(/&f=widget/g, '')) 추가 &f=widget 문자열 제거 (임시)
  data = new Set(data);
  if (data.has(value)) data.delete(value);
  data.add(value.replace(/&f=widget/g, '')); // 저장할 때도 &f=widget 문자열 제거 (임시)
  data = [...data];
  localStorage.setItem(key, JSON.stringify(data));
};

// 로컬 스토리지 삭제
export const deleteLocalStorage = (key, value) => {
  let data = localStorage.getItem(key);
  if (data) {
    data = JSON.parse(data).map((str) => str.replace(/&f=widget/g, '')); // .map((str) => str.replace(/&f=widget/g, '')) 추가 &f=widget 문자열 제거 (임시)
    data = data.filter((i) => i !== value);
    localStorage.setItem(key, JSON.stringify(data));
  }
};

// 로컬 스토리지 초기화
export const clearLocalStorage = (key) => {
  localStorage.removeItem(key);
};
