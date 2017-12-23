const { processStream } = require('./day9');

test('process example input streams', () => {
  expect(processStream('{}').length).toEqual(1);
  expect(processStream('{{{}}}').length).toEqual(3);
  // expect(processStream('{{},{}}').length).toEqual(3);
  // expect(processStream('{{{},{},{{}}}}').length).toEqual(3);
  // expect(processStream('{<{},{},{{}}>}').length).toEqual(1);
});