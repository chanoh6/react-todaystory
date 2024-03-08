class API {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  /**
   * @TODOS : 정리 필요
   */

  async category() {
    return this.apiClient.category().then((res) => res.data.data);
  }

  async categoryStories(idx) {
    return this.apiClient.categoryStories(idx).then((res) => res.data.data);
  }

  async channel() {
    return this.apiClient.channel().then((res) => res.data.data);
  }

  async channelStories(idx) {
    return this.apiClient.channelStories(idx).then((res) => res.data.data);
  }

  async topStories() {
    return this.apiClient.topStories().then((res) => res.data.data);
  }

  async bestStories(index) {
    return this.apiClient.bestStories(index).then((res) => res.data.data);
  }

  async editorsPick() {
    return this.apiClient.editorsPick().then((res) => res.data.data);
  }

  async story(idx) {
    return this.apiClient.story(idx).then((res) => res.data.data);
  }
}

export default API;
