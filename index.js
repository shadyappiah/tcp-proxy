const net = require('net');

const REMOTE_HOST = 'node0.mikosi.fr.eu.org';
const REMOTE_PORT = 443;

const server = net.createServer(clientSocket => {
  const remoteSocket = net.connect(REMOTE_PORT, REMOTE_HOST);

  clientSocket.pipe(remoteSocket);
  remoteSocket.pipe(clientSocket);

  clientSocket.on('error', () => remoteSocket.end());
  remoteSocket.on('error', () => clientSocket.end());
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Proxy server listening on port ${PORT}`));
