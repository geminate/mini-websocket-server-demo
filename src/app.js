const http = require('http');
const WebSocketServer = require('websocket').server;

const httpServer = http.createServer((request, response) => {
    console.log('[' + new Date + '] Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});

const wsServer = new WebSocketServer({
    httpServer,
    autoAcceptConnections: true
});

wsServer.on('connect', connection => {
    connection.on('message', message => {
        if (message.type === 'utf8') {
            console.log('>> message content from client: ' + message.utf8Data);
        }
    }).on('close', (reasonCode, description) => {
        console.log('[' + new Date() + '] Peer ' + connection.remoteAddress + ' disconnected.');
    });

    setInterval(() => {
        connection.sendUTF('[from server] ServerMessage');
    }, 5000)
});

httpServer.listen(8380, () => {
    console.log('[' + new Date() + '] Serveris listening on port 8080');
});
