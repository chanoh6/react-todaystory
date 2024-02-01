class Todaystory {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  async posts() {
    return this.apiClient.posts().then((res) => res.data);
  }
}

export default Todaystory;
