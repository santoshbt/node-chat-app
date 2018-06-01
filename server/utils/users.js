[{
  id: '234324#@$#@$@#$dfddssdfs',
  name: 'Andrew',
  room: 'The office fans'
}];

class Users {
  constructor(){
    this.users = [];
  }

  addUser(id, name, room){
    var room = room.toLowerCase();
    var user  =  {id, name, room};
    this.users.push(user);
  }

  removeUser(id) {
    var user = this.getUser(id);

    if(user) {
      this.users = this.users.filter((user) => user.id !== id);
    }

    return user;
  }

  getUser(id) {
    var users = this.users.filter((user) => user.id === id);
    return users[0];
  }

  getUserList(room) {
    var room = room.toLowerCase();
    console.log('room === ' + room);
    var users = this.users.filter((user) => {
      let userRoom = user.room.toLowerCase();
      return userRoom === room;
    });
    var namesArray = users.map((user) => user.name);
    console.log('namesArray === ' + namesArray)
    return namesArray;
  }
}

module.exports = {Users};
