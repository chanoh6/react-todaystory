import axios from 'axios';

class TodaystoryClient {
  constructor() {
    this.httpClient = axios.create({
      // for test
      baseURL: 'https://jsonplaceholder.typicode.com/',
      // .env 파일 활용하여 param 설정
    });
  }

  async posts() {
    return this.httpClient.get(`/posts`);
  }
}

export default TodaystoryClient;
