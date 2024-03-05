import axios from 'axios';

/**
 * @TODOS
 * 1. .env 파일 활용하여 param 설정
 * 2. api url 변경
 * */

class APIClient {
  constructor() {
    this.httpClient = axios.create({
      baseURL: `/json/${process.env.REACT_APP_LOCALE}`,
    });
  }

  async category() {
    return this.httpClient.get(`/category.json`);
  }

  async categoryStories(idx) {
    return this.httpClient.get(`/categoryStories${idx}.json`);
  }

  async channel() {
    return this.httpClient.get(`/channel.json`);
  }

  async channelStories(idx) {
    return this.httpClient.get(`/channelStories${idx}.json`);
  }

  async topStories() {
    return this.httpClient.get(`/topStories.json`);
  }

  async bestStories(index) {
    return this.httpClient.get(`/bestStories${index}.json`);
  }

  async editorsPick() {
    return this.httpClient.get(`/editorsPick.json`);
  }
}

export default APIClient;
