## Publish to Pactflow

1. Get your read/write API Token
2. `export PACT_BROKER_HOST=https://YOUR_PACTFLOW_SUBDOMAIN.pactflow.io`{{execute}}
2. `export PACT_BROKER_TOKEN=YOUR_API_TOKEN`{{execute}}
3. `npm run publish`
4. Go to Pactflow dashboard and check that a new contract has appeared

NOTE: can we automatically verify this step for the user during the course?