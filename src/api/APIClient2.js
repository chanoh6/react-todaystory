import axios from 'axios';

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

class AxiosWrapper {
  constructor(options = {}) {
    const { baseURL, url, method = 'get', headers = {}, params = {}, data = null } = options;
    this.baseURL = baseURL;
    this.url = url;
    this.method = method;
    this.headers = headers;
    this.params = params;
    this.data = data;
  }

  async call() {
    try {
      const response = await axios({
        baseURL: this.baseURL,
        url: this.url,
        method: this.method,
        headers: this.headers,
        params: this.params,
        data: this.data,
      });
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
}

export default AxiosWrapper;
