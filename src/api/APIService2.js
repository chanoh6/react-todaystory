import APIClient2 from 'api/APIClient2';

class APIService2 {
  constructor() {
    this.baseURL = process.env.REACT_APP_API_BASE_URL;
  }

  async fetchData(url, method = 'get', params = {}, data = {}) {
    const param = { baseURL: this.baseURL, url, method, params, data };
    const apiClient = new APIClient2(param);

    apiClient.setHeaders({ 'Content-Type': 'application/json' });

    try {
      const response = await apiClient.call();
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async category() {
    // no params
    return this.fetchData(process.env.REACT_APP_API_CATEGORY_URL);
  }

  async categoryStories(params) {
    // params: cate, page, size
    return this.fetchData(process.env.REACT_APP_API_CATEGORY_STORIES_URL, 'get', params);
  }

  async channel() {
    // no params
    return this.fetchData(process.env.REACT_APP_API_CHANNEL_URL);
  }

  async channelStories(params) {
    // params: cp, page, size
    return this.fetchData(process.env.REACT_APP_API_CHANNEL_STORIES_URL, 'get', params);
  }

  async topStories(params) {
    // params: size
    return this.fetchData(process.env.REACT_APP_API_TOP_STORIES_URL, 'get', params);
  }

  async bestStories(params) {
    // params: page, size
    return this.fetchData(process.env.REACT_APP_API_BEST_STORIES_URL, 'get', params);
  }

  async editorsPick() {
    // no params
    return this.fetchData(process.env.REACT_APP_API_EDITORS_PICK_URL);
  }

  async story(params) {
    // params: idx
    return this.fetchData(process.env.REACT_APP_API_STORY_URL, 'get', params);
  }

  async storiesByIndex(data) {
    // data: idxList
    return this.fetchData(process.env.REACT_APP_API_STORIES_BY_INDEX_URL, 'post', {}, data);
  }

  async updateViewCount(data) {
    // data: idx
    return this.fetchData(process.env.REACT_APP_API_VIEW_COUNT_URL, 'post', {}, data);
  }

  async updateLikeCount(data) {
    // data: idx
    return this.fetchData(process.env.REACT_APP_API_LIKE_COUNT_URL, 'post', {}, data);
  }

  async updateMoreCount(data) {
    // data: idx
    return this.fetchData(process.env.REACT_APP_API_MORE_COUNT_URL, 'post', {}, data);
  }
}

export default APIService2;
