Setup our workspace: `npm i"`{{execute}}

Create a package.json:

<pre class="file" data-filename="package.json" data-target="replace">
{
  "name": "pactflow-getting-started-js",
  "version": "0.1.0",
  "dependencies": {
    "axios": "^0.19.1"
  },
  "scripts": {
    "test:pact:consumer": "jest --testTimeout 30000 src/consumer/pact.spec.js",
    "test:pact:provider": "jest --testTimeout 30000 src/consumer/pact.spec.js"
  },
  "devDependencies": {
    "@pact-foundation/pact": "^9.9.12",
    "jest": "^26.5.2"
  }
}
</pre>

<pre class="file" data-filename="api.js" data-target="replace">
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
</pre>

