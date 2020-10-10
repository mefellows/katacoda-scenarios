const axios = require('axios');

class API {
  constructor(url) {
    if (url === undefined || url === "") {
      url = process.env.API_HOST;
    }
    this.url = url
  }

  async getProduct(id) {
    return axios.get(`${this.url}/products/${id}`).then(r => r.data);
  }
}
module.exports = {
  API
}