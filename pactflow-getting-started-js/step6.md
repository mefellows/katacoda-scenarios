# Verify the provider

Now that we published our contract, we can have the provider verify them each time their build runs, to prevent breaking consumers.

_NOTE_: Credentials from the previous step will be required for this step to run:

1. Go to Pactflow and get your read/write API Token
2. `export PACT_BROKER_BASE_URL=https://YOUR_PACTFLOW_SUBDOMAIN.pactflow.io`{{execute}}
2. `export PACT_BROKER_TOKEN=YOUR_API_TOKEN`{{execute}}
3. `npm run publish`
4. Go to Pactflow dashboard and check that a new contract has appeared

<pre class="file" data-filename="provider.js" data-target="replace">
const express = require("express")
const cors = require("cors")

const server = express()
server.use(cors())
server.use((req, res, next) => {
  res.header("Content-Type", "application/json; charset=utf-8")
  next()
})

server.get("/product/:id", (req, res) => {
  res.json({id: 1, name: "aussie", type: "hamburger"})
})

module.exports = {
  server
}
</pre>

We need 2 new dependencies to support the provider code, and to add a new command to test the provider. Update `package.json` to run the provider pact verification test:

<pre class="file" data-filename="package.json" data-target="replace">
{
  "name": "pactflow-getting-started-js",
  "version": "0.1.0",
  "dependencies": {
    "axios": "^0.19.1",
    "cors": "^2.8.5",
    "express": "^4.17.1"
  },
  "scripts": {
    "test:pact:consumer": "jest --testTimeout 30000 consumer.pact.spec.js",
    "test:pact:provider": "jest --testTimeout 30000 --forceExit provider.pact.spec.js",
    "publish": "./node_modules/.bin/pact-broker publish ./pacts --consumer-app-version 1.0.0"
  },
  "devDependencies": {
    "@pact-foundation/pact": "^9.9.12",
    "jest": "^26.5.2"
  }
}
</pre>

Update our dependencies: `npm i`{{execute}}

<pre class="file" data-filename="provider.pact.spec.js" data-target="replace">
const { Verifier } = require('@pact-foundation/pact');
const { server} = require('./provider');


describe("Pact Verification", () => {
  beforeAll((done) => {
    server.listen(8081, done)
  })

  it("validates the expectations of ProductService", () => {
    const opts = {
      logLevel: "INFO",
      providerBaseUrl: "http://localhost:8081",
      providerVersion: "1.0.0-somesha",
      provider: "katacoda-provider",
      consumerVersionSelectors: [{ tag: 'master', latest: true }, { tag: 'prod', latest: true } ],
      pactBrokerUrl: process.env.PACT_BROKER_BASE_URL,
      enablePending: true
    }

    return new Verifier(opts).verifyProvider()
      .then(output => {
        console.log("Pact Verification Complete!")
        console.log(output)
      })
  })

  afterAll(() => {
    server.close();
  })
});

</pre>

`npm run test:pact:provider`{{execute}}