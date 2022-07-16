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

// ecoute écriture dans le terminal
process.stdin.on('data', function(data) {
      // si data commence par "/game"
      if (data.toString().substring(0, 5) === "/game") {
        // démarre la partie
        console.log("La partie vient de commencer");
        //compte les clients connectés
        var nbClients = wss.clients.size;
        console.log("Il y a "+nbClients+" clients connectés");
        // envoie le nombre de clients connectés
        wss.clients.forEach(function(client) {
            client.send("La partie vient de commencer");
            client.send("Il y a "+nbClients+" clients connectés");
        }
        );

      }
    }
);

