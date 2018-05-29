var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var from = "Jen";
    var text = "Some message";
    var message = generateMessage(from, text);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from,text});

  });

  describe('generatLocationMessage', () => {
    it('should generate correct location object', () =>{
      var from = "Mike";
      var latitude = 10;
      var longitude = 20;
      url = 'https://www.google.com/maps?q=10,20'
      var message = generateLocationMessage(from, latitude, longitude);

      expect(message.createdAt).toBeA('number');
      expect(message).toInclude({from,url});
      // expect(message.url).toBe(`https://www.google.com/maps?q=${latitude},${longitude}`);
    })
  })
});
