import axios from 'axios';
import adapter from "axios/lib/adapters/http";

axios.defaults.adapter = adapter;

export class API {
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

export default new API();