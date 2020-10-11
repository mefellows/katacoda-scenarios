# Consumer

Create the following package.json (choose "copy to editor"). We need two dependencies to run our pact tests:

1. Jest to use as our unit testing framework
2. Pact for our API assertions

<pre class="file" data-filename="package.json" data-target="replace">
{
  "name": "pactflow-getting-started-js",
  "version": "0.1.0",
  "dependencies": {
    "axios": "^0.19.1"
  },
  "scripts": {
    "test:pact:consumer": "jest --testTimeout 30000 consumer.pact.spec.js",
    "publish": "./node_modules/.bin/pact-broker publish ./pacts --consumer-app-version 1.0.0"
  },
  "devDependencies": {
    "@pact-foundation/pact": "^9.9.12",
    "jest": "^26.5.2"
  }
}
</pre>

Install the dependencies for the project: `npm i`{{execute}}

## Consumer Code

### Product API service

This code is responsible for fetching products from the API, returning a `Product`, and will be the target of our Pact test:

<pre class="file" data-filename="api.js" data-target="replace">
const axios = require('axios');
const { Product } = require('./product');

class API {
  constructor(url) {
    this.url = url
  }

  async getProduct(id) {
    return axios.get(`${this.url}/products/${id}`).then(r => new Product(r.data.id, r.data.name, r.data.type));
  }
}
module.exports = {
  API
}
</pre>

Our `Product` domain model:

<pre class="file" data-filename="product.js" data-target="replace">
class Product {
  constructor(id, name, type) {
    this.id = id
    this.name = name
    this.type = type
  }
}
module.exports = {
  Product
}
</pre>

