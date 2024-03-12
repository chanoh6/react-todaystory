import axios from 'axios';

/**
 * @TODOS
 * 1. .env 파일 활용하여 param 설정
 * 2. api url 변경
 * 3. 예외 처리
 * 4. http client header
 * */

class APIClient {
  constructor() {
    this.httpClient = axios.create({
      baseURL: process.env.REACT_APP_API_BASE_URL,
    });
  }

  /*
  constructor(data) {
    this = ax
    this.setBody
    ....
    ...
    ...
    ...

  }
  .setHeader(....)
  .setBody(.....)
  .setXXXXX....
  .call(
    try {
        const aaa = axions.get()
    return aaaa
    } catch (e) {
      e.//////
    }
  )


  apiclient = new APIClient("post", "", "body");
  apiClient.setHeader("Content-Type", "application/json");
  apiClient.setB
  ....
  ....
  ....
  apiclient.call();
---------------------------------
  const param = {
    url : "http://localhost:8080",
    method : "post",

  }
  const apiClient = new APIClient(param);
  apiClient.call();
  */

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

  async storiesByIndex(idxList) {
    return this.httpClient.post(process.env.REACT_APP_API_STORIES_BY_INDEX_URL, { 'idx-list': idxList });
  }
}

export default APIClient;
