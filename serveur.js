// J'ai crée un serveur HTTP
const http = require('http');

// J'importe l'application Express
const app = require('./app');

// Je définis le port sur lequel le serveur va écouter
const numeroPort = 34;

// Je crée le serveur HTTP en utilisant l'application Express
const server = http.createServer(app);

// Je démarre le serveur et j'écoute sur le port défini
server.listen(numeroPort, () => {
  console.log(`Le serveur du TP-etudiant est à l'écoute en cours d'exécution sur le port ${numeroPort}`);
});

