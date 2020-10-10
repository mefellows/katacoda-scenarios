Setup our workspace: `npm i"`{{execute}}

Open the package.json:

`package.json`{{open}}

Do this:

```{
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
```{{copy}}


<pre class="file" data-filename="test.js" data-target="replace">var http = require('http');
var requestListener = function (req, res) {
  res.writeHead(200);
  res.end('Hello, World!');
}

var server = http.createServer(requestListener);
server.listen(3000, function() { console.log("Listening on port 3000")});
</pre>