'use strict';

var app    = require('express')();
var server = require('http').Server(app);
var io     = require('socket.io')(server);

const PORT    = process.env.PORT || 3000;
const exphbs  = require('express-handlebars');

//Setting up views
var hbs = exphbs.create({
  extname: '.hbs',
  defaultLayout : 'main',
  helpers : {
    currentIP : ((device) => {
      return device[0]['address'] + `:${PORT}`;
    })(require('os').networkInterfaces()['eth0'] || require('os').networkInterfaces()['lo'])
  }
})

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

//Home Route
app.get('/', (req, res, next) =>{
  let date = new Date();
  return res.render('home', {
    hours : date.getHours(),
    minutes : date.getMinutes(),
    seconds : date.getSeconds()
  });
});

server.listen(PORT, () =>{
  console.log(`Server started on ${PORT}`)
});

io.on('connection', (socket) => {
  //Send initial update
  socket.emit('update', getDate())

  //On askForUpdate, send update
  socket.on('askForUpdate', () =>{
    socket.emit('update', getDate());
  })
});

function getDate() {
  let date = new Date();
  return {
    hours : date.getHours(),
    minutes : date.getMinutes(),
    seconds : date.getSeconds()
  };
}
