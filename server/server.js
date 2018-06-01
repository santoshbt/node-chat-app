const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString, findUsersExists} = require('./utils/validation');
const {capitalize} = require('./utils/capitalize');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('join', (params, callback) => {
    let roomName = params.room.toLowerCase();
    if (!isRealString(params.name) || !isRealString(roomName)) {
      return callback('Name and Room name are required');
    }

    var currentUsers = users.getUserList(roomName);
    var found = currentUsers.find(function(currentUser) {
      return currentUser === params.name;
    });

    // var found = findUsersExists(roomName, params.name);
    // console.log('found==' + found);
    
    if(found){
      return callback('User with this name already exists');
    }

    socket.join(roomName);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, roomName);
    io.to(roomName).emit('updateUserList', users.getUserList(roomName));
    socket.emit('newMessage', generateMessage('Admin', `Hello ${capitalize(params.name)} Welcome to the chat app`));
    socket.broadcast.to(roomName).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));

    callback();
  });

  socket.on('createMessage', (message, callback) => {
    var user = users.getUser(socket.id);

    if(user && isRealString(message.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    }
    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    var user = users.getUser(socket.id);

    if(user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }

  });

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
    }
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
