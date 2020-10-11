const { Pact } = require ('@pact-foundation/pact');
const { API } = require ('./api');
const { Product } = require ('./product');
const { like, regex } = require ('@pact-foundation/pact/dsl/matchers');

const mockProvider = new Pact({
  consumer: 'katacoda-consumer',
  provider: 'katacoda-provider',
  cors: true // needed for katacoda environment
});

describe('Products API test', () => {
  beforeAll(() => mockProvider.setup());
  afterEach(() => mockProvider.verify());
  afterAll(() => mockProvider.finalize());

  test('get product by ID', async () => {
    // Arrange
    const expectedProduct = { id: 10, type: 'pizza', name: 'Margharita' }

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
    const product = await api.getProduct(10);

    // Assert that we got the expected response
    expect(product).toStrictEqual(new Product(10, 'Margharita', 'pizza'));
  });
});