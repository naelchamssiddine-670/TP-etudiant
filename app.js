// app.js
// J'importe le framework Express
const express = require('express');

const mysql = require('mysql2');
const path = require('path');

// J'importe le piloteur express-myconnection utilisé pour se connecter à la BDD
const myConnection = require('express-myconnection');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Je configure les éléments attendus pour me connecter à MySQL2
const optionsConnexionBasesDonnees = {
    host: 'localhost',
    user: 'root',
    password: 'naelchamssiddine@118',
    database: 'tp_etudiant',
    port: 3010,
}
/**
 * Middleware pour se connecter à la base de données MySQL2
 * Utilise le piloteur express-myconnection pour établir une connexion à la base de données
 * avec les options de connexion définies précédemment.
 * La connexion est établie à chaque requête et est disponible dans les routes via req.getConnection.
 */
app.use(myConnection(mysql, optionsConnexionBasesDonnees, 'pool'));
// Je précise que les vues sont dans le dossier "views"
app.set('views', './views');
// Je précise que le moteur de rendu est "ejs"
app.set('view engine', 'ejs');
// Je précise que les fichiers statiques sont dans le dossier "public"
app.use(express.static('public'));

// API ROUTE pour les formation : localhost:3010/api/formation
app.get('/', (req, res) => {
    res.write('<h1>Bienvenue dans la gestion des inscriptions pour les etudiants en formation. </h1>');
    res.end();
});

// API ROUTE pour les formation : localhost:3010/api/accueil
app.get('/api/accueil', (req, res) => {
    // logique de traitement de la requête pour récupérer les accueils
    console.log('Je passe dans /api/accueil');

    res.render('accueil');
});

//app.get pour afficher les détails d'une formation spécifique : localhost:3010/api/formation/:id
app.get('/api/formation', (req, res) => {
    // logique de traitement de la requête pour récupérer les détails d'une formation spécifique
    console.log('requete recue dans /api/formation');
    res.render('formation');
});

// API ROUTE pour la page etudiant : localhost:3010/api/etudiant
app.get('/api/etudiant', (req, res) => {
    // logique de traitement de la requête pour récupérer les détails d'une formation spécifique
    console.log('Je passe dans /api/etudiant');
    res.render('etudiant');
});


































module.exports = app;