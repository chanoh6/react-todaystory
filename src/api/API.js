class API {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  /**
   * @TODOS : 정리 필요
   */

  async category() {
    return this.apiClient.category().then((res) => res.data);
  }

  async categoryStories(cate, page, size) {
    return this.apiClient.categoryStories(cate, page, size).then((res) => res.data);
  }

  async channel() {
    return this.apiClient.channel().then((res) => res.data);
  }

  async channelStories(cp, page, size) {
    return this.apiClient.channelStories(cp, page, size).then((res) => res.data);
  }

  async topStories(size) {
    return this.apiClient.topStories(size).then((res) => res.data);
  }

  async bestStories(page, size) {
    return this.apiClient.bestStories(page, size).then((res) => res.data);
  }

  async editorsPick() {
    return this.apiClient.editorsPick().then((res) => res.data);
  }

  async story(idx) {
    return this.apiClient.story(idx).then((res) => res.data);
  }

  async storiesByIndex(idxList) {
    return this.apiClient.storiesByIndex(idxList).then((res) => res.data);
  }

  async updateViewCount(idx) {
    return this.apiClient.updateViewCount(idx).then((res) => res.data);
  }
}

export default API;
