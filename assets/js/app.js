const io = require('socket.io-client');

(function (window) {

  var socket = io('http://' + (window && window.app && window.app.config && window.app.config.host || '127.0.0.1:3000'));
  socket.on('update', function (data) {
    document.querySelector('#hh').innerText = data.hours
    document.querySelector('#mm').innerText = data.minutes
    document.querySelector('#ss').innerText = data.seconds
  });
  //Update the every second
  setInterval(function(){
    socket.emit('askForUpdate')
  }, 1000)
})(window);
