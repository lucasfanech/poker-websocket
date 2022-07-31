// include websocket
var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({port: 8080});
// tableau des joueurs;
var players = [];
// Fonction identifiant
wss.getUniqueID = function () {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4();
};

//Fonction getter pour récuperer le wss.client en fonction de son id
wss.getClient = function (id) {
    for (var i = 0; i < wss.clients.length; i++) {
        if (wss.clients[i].id === id) {
            return wss.clients[i];
        }
    }
}

// start Websocket server
wss.on('connection', function(ws) {
    ws.id = wss.getUniqueID();
  ws.on('message', function(message) {
    // if message isn't empty and equals to ""
    if (message && message !== "") {
      console.log('%s>%s',ws.id, message);
        if (message.toString().substring(0, 6) === "/ready") {
            players.push(ws.id);
            console.log(players);
        }
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
            client.send("Tapez '/ready' pour rejoindre la partie");
        }
        );

      }
    }
);

