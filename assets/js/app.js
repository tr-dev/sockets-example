(function (window) {
  var socket = window && window.app && window.app.socket || {};
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
