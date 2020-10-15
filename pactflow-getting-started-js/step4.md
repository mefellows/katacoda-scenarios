# Publish to Pactflow

Now that we have created our contract, we need to share the contract to our provider. This step is referred to as "publishing" the pact.

1. Go to Pactflow and get your read/write API Token
2. `export PACT_BROKER_BASE_URL=https://YOUR_PACTFLOW_SUBDOMAIN.pactflow.io`{{execute}}
2. `export PACT_BROKER_TOKEN=YOUR_API_TOKEN`{{execute}}
3. `npm run publish`{{execute}}
4. Go to Pactflow dashboard and check that a new contract has appeared

_NOTE: can we automatically verify this step for the user during the course?_
_NOTE: could use test.pactflow.io?_