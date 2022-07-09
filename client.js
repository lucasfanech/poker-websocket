// include websocket client
var WebSocket = require('ws');

// connect to websocket server
var ws = new WebSocket('ws://localhost:8080');
// listen for messages
ws.on('message', function(message) {
  console.log('received: %s', message);
}
);
// on write, send message
ws.on('open', function() {
    ws.send('Client s\'est connecté');
    // ecoute ecriture dans le terminal
    process.stdin.on('data', function(data) {
        ws.send(data);
    }
    );
}
);



