import axios from 'axios';

class TodaystoryClient {
  constructor() {
    this.httpClient = axios.create({
      // for test
      // @TODO: .env 파일 활용하여 param 설정
      baseURL: '/json',
    });
  }

  // @TODO: api url 변경

  async categoryList() {
    return this.httpClient.get(`/categoryList.json`);
  }

  async category(idx) {
    return this.httpClient.get(`/category${idx}.json`);
  }

  async channelList() {
    return this.httpClient.get(`/channelList.json`);
  }

  async channel(idx) {
    return this.httpClient.get(`/channel${idx}.json`);
  }

  async top() {
    return this.httpClient.get(`/topStories.json`);
  }

  async best(index) {
    return this.httpClient.get(`/bestStories${index}.json`);
  }

  async editors() {
    return this.httpClient.get(`/editorsPick.json`);
  }
}

export default TodaystoryClient;
