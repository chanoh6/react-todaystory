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
      if (response.code === '0') {
        return response.data;
      } else {
        console.error(response.msg);
        throw new Error(response.msg);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // 홈 화면 순서 및 데이터
  async home() {
    // no params
    return this.fetchData(process.env.REACT_APP_API_HOME_URL);
  }

  // 홈 화면 상단 스토리
  async topStories(params) {
    // params: size
    return this.fetchData(process.env.REACT_APP_API_TOP_STORIES_URL, 'get', params);
  }

  // 홈 화면 베스트 스토리
  async bestStories(params) {
    // params: page, size
    return this.fetchData(process.env.REACT_APP_API_BEST_STORIES_URL, 'get', params);
  }

  // 홈 화면 에디터 픽
  async editorsPick() {
    // no params
    return this.fetchData(process.env.REACT_APP_API_EDITORS_PICK_URL);
  }

  // 카테고리 리스트
  async category() {
    // no params
    return this.fetchData(process.env.REACT_APP_API_CATEGORY_URL);
  }

  // 카테고리별 스토리
  async categoryStories(params) {
    // params: cate, page, size
    return this.fetchData(process.env.REACT_APP_API_CATEGORY_STORIES_URL, 'get', params);
  }

  // 채널 리스트
  async channel() {
    // no params
    return this.fetchData(process.env.REACT_APP_API_CHANNEL_URL);
  }

  // 채널별 스토리
  async channelStories(params) {
    // params: cp, page, size
    return this.fetchData(process.env.REACT_APP_API_CHANNEL_STORIES_URL, 'get', params);
  }

  // 상세 스토리
  async story(params) {
    // params: idx
    return this.fetchData(process.env.REACT_APP_API_STORY_URL, 'get', params);
  }

  // 인덱스별 스토리 (공감, 최근 본 스토리)
  async storiesByIndex(data) {
    // data: idxList
    return this.fetchData(process.env.REACT_APP_API_STORIES_BY_INDEX_URL, 'post', {}, data);
  }

  // 조회수 업데이트
  async updateViewCount(data) {
    // data: idx
    return this.fetchData(process.env.REACT_APP_API_VIEW_COUNT_URL, 'post', {}, data);
  }

  // 좋아요 업데이트
  async updateLikeCount(data) {
    // data: idx
    return this.fetchData(process.env.REACT_APP_API_LIKE_COUNT_URL, 'post', {}, data);
  }

  // 더보기 업데이트
  async updateMoreCount(data) {
    // data: idx
    return this.fetchData(process.env.REACT_APP_API_MORE_COUNT_URL, 'post', {}, data);
  }
}

export default APIService2;
