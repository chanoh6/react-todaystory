import AxiosWrapper from 'api/APIClient2';

class APIService {
  constructor() {}

  async callAPI({ url, method, params = {}, data = {} }) {
    const axiosWrapper = new AxiosWrapper({
      baseURL: process.env.REACT_APP_API_BASE_URL,
      url,
      method,
      headers: { 'Content-Type': 'application/json' },
      params,
      data,
    });
    return axiosWrapper.call();
  }

  async category() {
    return this.callAPI({ url: process.env.REACT_APP_API_CATEGORY_URL, method: 'get' });
  }

  async categoryStories({ cate, page, size }) {
    return this.callAPI({
      url: process.env.REACT_APP_API_CATEGORY_STORIES_URL,
      method: 'get',
      params: { cate, page, size },
    });
  }

  async channel() {
    return this.callAPI({ url: process.env.REACT_APP_API_CHANNEL_URL, method: 'get' });
  }

  async channelStories({ cp, page, size }) {
    return this.callAPI({
      url: process.env.REACT_APP_API_CHANNEL_STORIES_URL,
      method: 'get',
      params: { cp, page, size },
    });
  }

  async topStories({ size }) {
    return this.callAPI({ url: process.env.REACT_APP_API_TOP_STORIES_URL, method: 'get', params: { size } });
  }

  async bestStories({ page, size }) {
    return this.callAPI({ url: process.env.REACT_APP_API_BEST_STORIES_URL, method: 'get', params: { page, size } });
  }

  async editorsPick() {
    return this.callAPI({ url: process.env.REACT_APP_API_EDITORS_PICK_URL, method: 'get' });
  }

  async story({ idx }) {
    return this.callAPI({ url: process.env.REACT_APP_API_STORY_URL, method: 'get', params: { idx } });
  }

  async storiesByIndex({ idxList }) {
    return this.callAPI({ url: process.env.REACT_APP_API_STORIES_BY_INDEX_URL, method: 'post', data: { idxList } });
  }

  async updateViewCount({ idx }) {
    return this.callAPI({ url: process.env.REACT_APP_API_VIEW_COUNT_URL, method: 'post', data: { idx } });
  }
}

export default APIService;
