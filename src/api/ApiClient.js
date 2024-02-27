import axios from 'axios';

/**
 * @TODOS
 * 1. .env 파일 활용하여 param 설정
 * 2. api url 변경
 * */

class ApiClient {
  constructor() {
    this.httpClient = axios.create({
      baseURL: '/json',
    });
  }

  async categoryList(lang) {
    return this.httpClient.get(`/${lang}/categoryList.json`);
  }

  async category(idx) {
    return this.httpClient.get(`/category${idx}.json`);
  }

  async channelList() {
    return this.httpClient.get(`/channelList.json`);
  }

  async channel(idx) {
    return this.httpClient.get(`/channel${idx}.json`);
  }

  async top(lang) {
    return this.httpClient.get(`/${lang}/topStories.json`);
  }

  async best(index) {
    return this.httpClient.get(`/bestStories${index}.json`);
  }

  async editors(lang) {
    return this.httpClient.get(`/${lang}/editorsPick.json`);
  }
}

export default ApiClient;
