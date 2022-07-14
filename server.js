// include websocket
var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({port: 8080});
// start Websocket server
wss.on('connection', function(ws) {
  ws.on('message', function(message) {
    // if message isn't empty and equals to ""
    if (message && message !== "") {
      console.log('>%s', message);

      // send message to all clients
        wss.clients.forEach(function(client) {
            client.send('>'+message);
        }
        );
    }
  });

}
);
