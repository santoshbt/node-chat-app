const expect = require('expect');

var {capitalize} = require('./capitalize');


describe('capitalize', () => {
  it('should return the capitalized value of the string passed', () => {
    var str = 'i am Here';
    var result = capitalize(str);

    expect(result).toEqual('I am Here');
  });
});
