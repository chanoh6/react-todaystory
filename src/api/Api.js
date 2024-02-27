class Api {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  /**
   * @TODOS : 정리 필요
   */

  async categoryList(lang) {
    return this.apiClient.categoryList(lang).then((res) => res.data.data);
  }

  async category(idx) {
    return this.apiClient.category(idx).then((res) => res.data.data);
  }

  async channelList() {
    return this.apiClient.channelList().then((res) => res.data.data);
  }

  async channel(idx) {
    return this.apiClient.channel(idx).then((res) => res.data.data);
  }

  async top(lang) {
    return this.apiClient.top(lang).then((res) => res.data.data);
  }

  async best(index) {
    return this.apiClient.best(index).then((res) => res.data.data);
  }

  async editors() {
    return this.apiClient.editors().then((res) => res.data.data);
  }
}

export default Api;
