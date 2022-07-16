// include websocket client
var WebSocket = require('ws');
var username ="";
// connect to websocket server
var ws = new WebSocket('ws://localhost:8080');
console.log('Entrez un nom d\'utilisateur');
process.stdin.on('data', function(data) {
    if (username === "") {
        username = data.toString().trim();
        ws.send('Client s\'est connecté: ' + username);
    }
}

);
// listen for messages
ws.on('message', function(message) {
    // get size of username
    var usernameSize = username.length;
    //convert message to string
    var FullMessage = message.toString();
    // if FullMessage doesn't begin with ">" + username
    if (!(FullMessage.substring(0, usernameSize + 1) === ">" + username)) {
        console.log('%s', message);
    }
}
);
// on write, send message
ws.on('open', function() {

    // ecoute ecriture dans le terminal
    process.stdin.on('data', function(data) {
        ws.send(username+": "+data);
    }
    );
}
);



