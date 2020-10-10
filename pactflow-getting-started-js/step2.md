create the pact test:

<pre class="file" data-filename="api.consumer.pact.js" data-target="replace">
const { Pact } = require ('@pact-foundation/pact');
const { API } = require ('./api');
const { like, regex } = require ('@pact-foundation/pact/dsl/matchers');

const mockProvider = new Pact({
  consumer: 'pactflow-example-consumer',
  provider: 'pactflow-example-provider',
  cors: true // only needed for katacoda
});

describe('API Pact test', () => {
  beforeAll(() => mockProvider.setup());
  afterEach(() => mockProvider.verify());
  afterAll(() => mockProvider.finalize());

  describe('retrieving a product', () => {
    test('ID 10 exists', async () => {
      // Arrange
      const expectedProduct = { id: '10', type: 'CREDIT_CARD', name: '28 Degrees' }

      await mockProvider.addInteraction({
        state: 'a product with ID 10 exists',
        uponReceiving: 'a request to get a product',
        withRequest: {
          method: 'GET',
          path: '/products/10'
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': regex({generate: 'application/json; charset=utf-8', matcher: '^application\/json'}),
          },
          body: like(expectedProduct),
        },
      });

      // Act
      const api = new API(mockProvider.mockService.baseUrl);
      const product = await api.getProduct('10');

      // ssert that we got the expected response
      expect(product).toStrictEqual(expectedProduct);
    });
  });
});

</pre>

`npm run test:pact:consumer`{{execute}}