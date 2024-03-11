import axios from 'axios';

/**
 * @TODOS
 * 1. .env 파일 활용하여 param 설정
 * 2. api url 변경
 * */

class APIClient {
  constructor() {
    this.httpClient = axios.create({
      baseURL: process.env.REACT_APP_API_BASE_URL,
    });
  }

  async category() {
    return this.httpClient.get(process.env.REACT_APP_API_CATEGORY_URL);
  }

  async categoryStories(cate, page, size) {
    return this.httpClient.get(process.env.REACT_APP_API_CATEGORY_STORIES_URL, {
      params: { cate, page, size },
    });
  }

  async channel() {
    return this.httpClient.get(process.env.REACT_APP_API_CHANNEL_URL);
  }

  async channelStories(cp, page, size) {
    return this.httpClient.get(process.env.REACT_APP_API_CHANNEL_STORIES_URL, {
      params: { cp, page, size },
    });
  }

  async topStories(size) {
    return this.httpClient.get(process.env.REACT_APP_API_TOP_STORIES_URL, { params: { size } });
  }

  async bestStories(page, size) {
    return this.httpClient.get(process.env.REACT_APP_API_BEST_STORIES_URL, { params: { page, size } });
  }

  async editorsPick() {
    return this.httpClient.get(process.env.REACT_APP_API_EDITORS_PICK_URL);
  }

  async story(idx) {
    return this.httpClient.get(process.env.REACT_APP_API_STORY_URL, { params: { idx } });
  }
}

export default APIClient;
