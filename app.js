// Fichier principal de l'application Express
// Il sert a configurer le serveur, la base de donnees et les routes
const express = require('express');

// mysql2 permet de communiquer avec MySQL
const mysql = require('mysql2');

// express-myconnection permet d'utiliser plus facilement la connexion MySQL dans les routes
const myConnection = require('express-myconnection');

// Creation de l'application Express
const app = express();

// Middleware pour lire les donnees JSON envoyees par le navigateur ou un formulaire
app.use(express.json());

// Middleware pour lire les donnees des formulaires HTML classiques
app.use(express.urlencoded({extended: false}));

// Parametres de connexion a la base de donnees
// ⚠️ Conseil : Pensez a utiliser "dotenv" pour ne pas laisser ce mot de passe en clair
const optionsConnexionBasesDonnees = {
    host: 'localhost',
    user: 'root',
    password: 'naelchamssiddine@118', 
    database: 'tpetudiant',
    port: 3306
};

// Ce middleware connecte l'application a MySQL
// Le mode "pool" permet d'utiliser un groupe de connexions re-utilisables
app.use(myConnection(mysql, optionsConnexionBasesDonnees, 'pool'));

// On indique a Express ou trouver les fichiers .ejs
app.set('views', './views');

// On indique que le moteur de template utilise est EJS
app.set('view engine', 'ejs');

// On rend accessibles les fichiers statiques du dossier public (css, js, images)
app.use(express.static('public'));

// --- ROUTES ---

// Route de base du projet
app.get('/', (req, res) => {
    res.send('<h1>Bienvenue dans la gestion des inscriptions pour les etudiants en formation. </h1>');
});

// ACCUEIL (Formulaire d'inscription)
app.get('/api/accueil', (req, res) => {
    // Petit message dans la console pour savoir que la route est appelee
    console.log('requete recue dans /api/accueil');

    // Affiche la vue accueil.ejs
    res.render('accueil');
});

// Route POST pour enregistrer un nouvel etudiant depuis le formulaire d'accueil
app.post('/api/accueil', (req, res) => {
    const { nom, prenom, adresse_postale, email, mot_de_passe, formation_id } = req.body;
    // Affichage des donnees recues dans la console
    const showPasswords = process.env.LOG_PASSWORDS === 'true';
    // On masque le mot de passe dans les logs pour des raisons de securite, sauf si LOG_PASSWORDS est a true
    const loggedBody = { ...req.body, mot_de_passe: mot_de_passe ? (showPasswords ? mot_de_passe : '****') : '' };
    // Affiche les donnees recues dans la console, avec le mot de passe masque
    console.log('Inscription reçue:', loggedBody);
    // Connexion a la base de donnees
    req.getConnection((err, connection) => {
        if (err) {// En cas d'erreur de connexion, on affiche l'erreur dans la console et on renvoie une reponse d'erreur au client
            console.error('Erreur connexion BDD:', err);// On renvoie une reponse d'erreur au client
            return res.status(500).send('Erreur lors de la connexion à la base de données');// On arrete l'execution de la fonction pour ne pas continuer a essayer d'executer des requetes sur une connexion qui a echoue
        }
        // Requete SQL d'insertion d'un nouvel etudiant
        const sql = `INSERT INTO etudiant (nom, prenom, adresse_postale, email, mot_de_passe, formation_id) VALUES (?, ?, ?, ?, ?, ?)`;
        const params = [nom, prenom, adresse_postale || '', email, mot_de_passe, formation_id || null];// On utilise des valeurs par defaut pour les champs optionnels (adresse_postale et formation_id) pour eviter les erreurs SQL si ces champs ne sont pas remplis

        connection.query(sql, params, (qErr, result) => {// Callback de la requete d'insertion
            if (qErr) {
                console.error('Erreur insertion étudiant:', qErr);// En cas d'erreur d'insertion, on affiche l'erreur dans la console et on renvoie une reponse d'erreur au client
                return res.status(500).send('Erreur lors de l\'inscription');// On arrete l'execution de la fonction pour ne pas continuer a essayer d'envoyer une reponse apres une erreur
            }

            console.log('Insertion réussite, id:', result.insertId);// Affiche l'id de l'etudiant insere dans la console

            // ON GARDE UNIQUEMENT LA REDIRECTION
            // Cela évite l'erreur "Cannot set headers after they are sent"
            res.redirect('/api/accueil');
        });
    });
});

// FORMATION
app.get('/api/formation', (req, res) => {
    // Trace dans la console
    console.log('requete recue dans /api/formation');

    // Affiche la page des formations
    res.render('formation');
});

// ENSEIGNANT
app.get('/api/enseignant', (req, res) => {
    // Message de passage dans cette route
    console.log('Je passe dans /api/enseignant');

    // Connexion a la base de donnees
    req.getConnection((err, connection) => {
        if (err) return console.log(err);
        
        // Recuperer tous les enseignants de la table enseignant
        connection.query('SELECT * FROM enseignant', [], (err, resultatEnseignant) => {
            if (err) {
                console.log("Erreur dans la requete SQL SELECT: ", err);
            } else {
                // Envoie les donnees a la vue enseignant.ejs
                res.render('enseignant', { resultatEnseignant });
            }
        });
    });
});

// Route POST pour ajouter un enseignant depuis le formulaire
app.post('/api/enseignant', (req, res) => {
    // Affiche le nom recu dans la console
    console.log("Event: Route POST /api/enseignant", req.body.nom);

    // Recuperation des champs du formulaire
    const { nom, prenom, date_recrutement, matiere_enseignee, formation_id } = req.body;

    // Recuperation d'une connexion a la base
    req.getConnection((err, connection) => {
        if (err) {
            console.error("DB connection error:", err);
            return res.status(500).send("Erreur DB");
        }
        
        // Requete SQL d'insertion d'un nouvel enseignant
        connection.query(
            "INSERT INTO enseignant (nom, prenom, date_recrutement, matiere_enseignee, formation_id) VALUES (?, ?, ?, ?, ?)",
            [nom, prenom, date_recrutement, matiere_enseignee, formation_id || null],
            (err) => {
                if (err) {
                    console.error("Insert error:", err);
                    return res.status(500).send("Erreur ajout");
                }

                // Affiche les donnees de l'enseignant ajoute dans la console
                console.log("Enseignant ajouté:", { nom, prenom, date_recrutement, matiere_enseignee, formation_id });
                
                // Redirection apres ajout
                res.redirect('/api/enseignant');

                // Meme remarque ici : cette ligne en plus risque de creer une double reponse
                 //res.send('<p>Merci — de votre inscription.</p><p><a href="/api/contact">Retour</a></p>');
            }
        );
    });
});

// Route POST pour supprimer un enseignant par son identifiant
app.post('/api/enseignant/:id/supprimer', (req, res) => {
    const { id } = req.params;
    // Affiche l'id de l'enseignant a supprimer dans la console
    req.getConnection((err, connection) => {// Recuperation d'une connexion a la base
        if (err) {// En cas d'erreur de connexion, on affiche l'erreur dans la console et on renvoie une reponse d'erreur au client
            console.error("DB connection error:", err);// On renvoie une reponse d'erreur au client
            return res.status(500).send("Erreur DB");// On arrete l'execution de la fonction pour ne pas continuer a essayer d'executer des requetes sur une connexion qui a echoue
        }

        connection.query(
            "DELETE FROM enseignant WHERE id = ?",// Requete SQL de suppression de l'enseignant avec l'id specifie
            [id],
            (deleteErr) => {// Callback de la requete de suppression
                if (deleteErr) {// En cas d'erreur de suppression, on affiche l'erreur dans la console et on renvoie une reponse d'erreur au client
                    console.error("Delete error:", deleteErr);// On renvoie une reponse d'erreur au client
                    return res.status(500).send("Erreur suppression");// On arrete l'execution de la fonction pour ne pas continuer a essayer d'envoyer une reponse apres une erreur
                }

                console.log("Enseignant supprimé, id:", id);// Affiche l'id de l'enseignant supprime dans la console
                res.redirect('/api/enseignant');// Redirection apres suppression
            }
        );
    });
});

// CONTACT
app.get('/api/contact', (req, res) => {
    // Log dans la console
    console.log('requete recue dans /api/contact');

    // Affiche la vue contact.ejs
    res.render('contact');
});

// Route POST pour recevoir le formulaire de contact
app.post('/api/contact', (req, res) => {
    // Recuperation des champs du formulaire
    const { nom, email, sujet, message } = req.body;

    // Affichage des donnees recues
    console.log('Contact reçu:', { nom, email, sujet, message });

    // Reponse simple apres envoi du formulaire
    res.send('<p>Merci — votre message a bien été reçu.</p><p><a href="/api/contact">Retour</a></p>');
});

// Export de l'application pour qu'elle soit utilisee dans serveur.js
module.exports = app;
