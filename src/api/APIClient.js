import axios from 'axios';

/**
 * @TODOS
 * 1. .env 파일 활용하여 param 설정
 * 2. api url 변경
 * */

class APIClient {
  constructor() {
    this.httpClient = axios.create({
      baseURL: '',
    });
  }

  async category() {
    return this.httpClient.get(`/json/${process.env.REACT_APP_LOCALE}/category.json`);
  }

  async categoryStories(idx) {
    return this.httpClient.get(`/json/${process.env.REACT_APP_LOCALE}/categoryStories${idx}.json`);
  }

  async channel() {
    return this.httpClient.get(`/json/${process.env.REACT_APP_LOCALE}/channel.json`);
  }

  async channelStories(idx) {
    return this.httpClient.get(`/json/${process.env.REACT_APP_LOCALE}/channelStories${idx}.json`);
  }

  async topStories() {
    return this.httpClient.get(`/json/${process.env.REACT_APP_LOCALE}/topStories.json`);
  }

  async bestStories(index) {
    return this.httpClient.get(`/json/${process.env.REACT_APP_LOCALE}/bestStories${index}.json`);
  }

  async editorsPick() {
    return this.httpClient.get(`/json/${process.env.REACT_APP_LOCALE}/editorsPick.json`);
  }

  async story(idx) {
    return this.httpClient.get(`${process.env.REACT_APP_API_STORY_URL}?idx=${idx}`);
  }
}

export default APIClient;
