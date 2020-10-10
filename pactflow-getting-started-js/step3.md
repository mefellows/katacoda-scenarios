## Publish to Pactflow

1. Get your read/write API Token
2. `export PACT_BROKER_HOST=https://<your subdomain>.pactflow.io`
2. `export PACT_BROKER_TOKEN=<your token here>`
3. `make publish_pacts`
4. Go to Pactflow dashboard and check that a new contract has appeared

NOTE: we can automatically verify this step for the user