const { getUser } = require('../src/users');

describe('TEST API FUNCTIONS', () => {
  it('getUser(endpoint)', () => {
    const req = {
    };
    const res = {
      status: (code) => {
        expect(code).toEqual(500);
        return res;
      },
      json: (ms) => {
        expect(ms).toEqual({ message: 'No implemented yet', code: 10 });
        return res;
      },
    };
    return getUser(req, res);
  });
});
