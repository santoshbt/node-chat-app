const {Users} = require('./users');

var users = new Users();

var isRealString = (str) => {
  return typeof str === 'string' && str.trim().length > 0;
};


var findUsersExists = (roomName, name) => {

  var currentUsers = users.getUserList(roomName);
  var usr =  currentUsers.find(function(currentUser) {
    return currentUser === name;
  });
  // return usr;
}

module.exports = {isRealString, findUsersExists};
