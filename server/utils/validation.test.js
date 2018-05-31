const expect = require('expect');

var {isRealString} = require('./validation');

describe('isRealString', () => {
  it('should reject the non string values', () => {
    var str = 2312;
    var result = isRealString(str);
    expect(result).toBeFalsy();
  });

  it('should reject string with only white spaces', () => {
    var str = '      ';
    var result = isRealString(str);
    expect(result).toBeFalsy();
  });

  it('should allow strings with non-space characters', () => {
      var str = 'Santosh';
      var result = isRealString(str);
      expect(result).toBeTruthy();
  });
});
