module.exports = {
  ...jest.requireActual('..'),
  __esModule: true,
  getSecretWord: jest.fn().mockRejectedValue({ type: 'mock' }),
};
