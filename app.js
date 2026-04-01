// app.js
// J'importe le framework Express
const express = require('express');

const mysql = require('mysql2');

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
    port: 3012,
};
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

//app.get pour afficher les détails d'une formation spécifique : localhost:3010/api/enseigant/:id
app.get('/api/enseignant', (req, res) => {
    // logique de traitement de la requête pour récupérer les détails d'une formation spécifique
    console.log('requete recue dans /api/enseignant');
    res.render('enseignant');
});

//API ROUTE pour les etudiant : localhost:3010/api/etudiant
app.get('/api/enseignant', (req, res) => {
    // logique de traitement de la requête pour récupérer les détails d'une formation spécifique
    console.log('Je passe dans /api/enseignant');

    //Je me connecte à la base de données pour récupérer les formations disponibles et les passer à la vue
    req.getConnection((err, connection) => {
        if (erreur) {
            console.log(erreur);
        }else {
            connection.query('SELECT * FROM formation', [],(err, formation) => {
                if (err) {
                    console.log("Erreur dans la requete SQL SELECT: ", err);
                } else {
                    console.log("nouveau enseignant: ", formation);
                    res.render('enseignant', {formation: formation});
                }
            });
        }
    });
});


// API ROUTE pour la page etudiant : localhost:3010/api/etudiant
app.get('/api/etudiant', (req, res) => {
    // logique de traitement de la requête pour récupérer les détails d'une formation spécifique
    console.log('Je passe dans /api/etudiant');
    res.render('etudiant');
});
// Traiter l'inscription depuis la page /api/accueil (POST)
app.post('/api/accueil', (req, res) => {
    const { nom, prenom, adresse_postale, email, mot_de_passe, formation_id } = req.body;// Récupère les données du corps de la requête POST pour l'inscription d'un étudiant

    // mot de passe est un champ sensible, on peut choisir de ne pas le logguer ou de le masquer
    const showPasswords = process.env.LOG_PASSWORDS === 'true';// Si LOG_PASSWORDS=true, on affiche les mots de passe en clair dans les logs (non recommandé en production)
    if (showPasswords) console.warn('WARNING: LOG_PASSWORDS=true — passwords will be logged in plaintext (insecure).');// Sinon, on masque les mots de passe dans les logs
    const loggedBody = Object.assign({}, req.body, { mot_de_passe: mot_de_passe ? (showPasswords ? mot_de_passe : '****') : '' });// Crée une copie de req.body avec mot_de_passe masqué ou affiché selon la configuration
    console.log('POST /api/accueil body:', loggedBody);// Log la requête POST avec le corps de la requête (mot de passe masqué ou affiché selon la configuration)

    req.getConnection((err, connection) => {// Récupère une connexion à la base de données depuis le pool
        if (err) {
            console.error('Erreur connexion BDD:', err);// Log l'erreur de connexion à la base de données
            return res.status(500).send('Bienvenue sur la page d\'inscription');// Si une erreur de connexion se produit, log l'erreur et retourne une réponse d'erreur 500
        }
        const sql = `INSERT INTO etudiant (nom, prenom, adresse_postale, email, mot_de_passe, formation_id) VALUES (?, ?, ?, ?, ?, ?)`;// Requête SQL pour insérer un nouvel étudiant dans la table "etudiant" avec des paramètres pour éviter les injections SQL
        const params = [nom, prenom, adresse_postale || '', email, mot_de_passe, formation_id || null];// Paramètres à passer à la requête SQL, en utilisant des valeurs par défaut pour les champs optionnels (adresse_postale et formation_id)

        // Log the SQL and parameters that will be executed (password masked unless enabled)
        const paramsLogged = params.map(p => (p === mot_de_passe ? (showPasswords ? mot_de_passe : '') : p));// Crée une version des paramètres à logguer avec le mot de passe masqué ou affiché selon la configuration
        console.log('Executing SQL:', sql);// Log la requête SQL qui va être exécutée
        console.log('With params:', paramsLogged);// Log les paramètres qui vont être utilisés dans la requête SQL (mot de passe masqué ou affiché selon la configuration)

        connection.query(sql, params, (qErr, result) => {// Exécute la requête SQL avec les paramètres fournis
            if (qErr) {
                console.error('Erreur insertion étudiant:', qErr);// Log l'erreur d'insertion dans la base de données
                return res.status(500).send('Erreur lors de l\'inscription');// Si une erreur d'insertion se produit, log l'erreur et retourne une réponse d'erreur 500
            }
            console.log('Insertion réussite, insertId=', result.insertId);// Log le succès de l'insertion avec l'ID de l'étudiant inséré
            res.redirect('/api/etudiant');// Après l'insertion réussie, redirige vers la page de l'étudiant pour afficher les détails ou la confirmation d'inscription
        });
    });
});


app.get('/api/contact', (req, res) => {
    // logique de traitement de la requête pour récupérer les détails d'une formation spécifique
    console.log('requete recue dans /api/contact');
    res.render('contact');
});

// Recevoir le formulaire de contact
app.post('/api/contact', (req, res) => {
    const { nom, email, sujet, message } = req.body;
    // log minimal (éviter d'exposer des données sensibles)
    console.log('Contact reçu:', { nom, email, sujet });
    console.log('Message:', message);
    // Vous pouvez ici stocker en BDD ou envoyer un email avec nodemailer
    res.send('<p>Merci — votre message a bien été reçu.</p><p><a href="/api/contact">Retour</a></p>');
});



module.exports = app;
