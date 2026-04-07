-- Ce script sert a creer la base de donnees de ton projet TP-etudiant.
-- Il cree la base, les tables principales, puis ajoute quelques donnees de depart.

-- Creer la base de donnees principale du projet.
CREATE DATABASE tp_etudiant;

-- Dire a MySQL d'utiliser cette base pour les prochaines requetes.
USE tp_etudiant;

-- Afficher toutes les bases disponibles sur le serveur MySQL.
SHOW DATABASES;

-- Creer la table "formation".
-- Cette table stocke les informations sur les differentes formations proposees.
CREATE TABLE formation (
    -- id = identifiant unique de la formation
    -- AUTO_INCREMENT signifie que MySQL ajoute automatiquement 1, 2, 3, etc.
    id INT PRIMARY KEY AUTO_INCREMENT,

    -- titre_de_formation = nom de la formation
    titre_de_formation VARCHAR(255) NOT NULL,

    -- lieu = ville ou endroit ou la formation se passe
    lieu VARCHAR(255) NOT NULL,

    -- date_debut = date de debut de la formation
    date_debut DATE NOT NULL,

    -- date_fin = date de fin de la formation
    date_fin DATE NOT NULL,

    -- description_formation = texte libre pour decrire la formation
    description_formation TEXT
);

-- Afficher les tables de la base actuelle.
SHOW TABLES;

-- Ajouter une premiere formation dans la table "formation".
INSERT INTO formation (titre_de_formation, lieu, date_debut, date_fin, description_formation)
VALUES ('Formation en developpement web', 'Mayotte', '2024-03-31', '2026-04-30', 'Apprenez les bases du developpement web avec HTML, CSS et JavaScript.');

-- Ajouter une deuxieme formation.
INSERT INTO formation (titre_de_formation, lieu, date_debut, date_fin, description_formation)
VALUES ('Formation en maintenance informatique', 'Nantes', '2026-03-31', '2027-04-30', 'Decouvrez les techniques de maintenance informatique, y compris la gestion des systemes et la resolution de problemes.');

-- Ajouter une troisieme formation.
INSERT INTO formation (titre_de_formation, lieu, date_debut, date_fin, description_formation)
VALUES ('Formation en cybersecurite', 'Lyon', '2026-03-31', '2026-04-30', 'Apprenez les principes de la cybersecurite et comment proteger les systemes informatiques contre les menaces.');

-- Ajouter une quatrieme formation.
INSERT INTO formation (titre_de_formation, lieu, date_debut, date_fin, description_formation)
VALUES ('Formation en comptabilite', 'La Reunion', '2026-03-31', '2026-04-30', 'Apprenez les bases de la comptabilite et comment gerer les etats financiers.');

-- Ajouter une cinquieme formation.
INSERT INTO formation (titre_de_formation, lieu, date_debut, date_fin, description_formation)
VALUES ('Formation en marketing digital', 'Paris', '2026-03-31', '2026-04-30', 'Decouvrez les strategies de marketing digital pour promouvoir votre entreprise en ligne.');

-- Ajouter une sixieme formation.
INSERT INTO formation (titre_de_formation, lieu, date_debut, date_fin, description_formation)
VALUES ('Formation en gestion de projet', 'Marseille', '2026-03-31', '2026-04-30', 'Apprenez les competences necessaires pour gerer efficacement des projets et atteindre vos objectifs.');

-- Creer la table "etudiant".
-- Cette table stocke les informations des etudiants inscrits.
CREATE TABLE etudiant (
    -- id unique pour chaque etudiant
    id INT PRIMARY KEY AUTO_INCREMENT,

    -- nom de famille de l'etudiant
    nom VARCHAR(255) NOT NULL,

    -- prenom de l'etudiant
    prenom VARCHAR(255) NOT NULL,

    -- adresse postale
    adresse_postale VARCHAR(255) NOT NULL,

    -- email unique pour eviter d'avoir deux comptes avec la meme adresse
    email VARCHAR(255) NOT NULL UNIQUE,

    -- mot de passe de l'etudiant
    mot_de_passe VARCHAR(255) NOT NULL,

    -- formation_id permet de relier un etudiant a une formation
    -- NULL signifie que ce champ peut etre vide
    formation_id INT NULL,

    -- FOREIGN KEY = cle etrangere
    -- Cela indique que formation_id doit correspondre a un id existant dans la table formation
    FOREIGN KEY (formation_id) REFERENCES formation(id)
);

-- Creer la table "enseignant".
-- Cette table stocke les informations des enseignants.
CREATE TABLE enseignant (
    -- id unique pour chaque enseignant
    id INT PRIMARY KEY AUTO_INCREMENT,
    -- nom de famille de l'enseignant
    nom VARCHAR(255) NOT NULL,
    -- prenom de l'enseignant
    prenom VARCHAR(255) NOT NULL,
    -- date de recrutement de l'enseignant
    date_recrutement DATE NOT NULL,
    -- matiere_enseignee = matiere que l'enseignant enseigne
    matiere_enseignee VARCHAR(255) NOT NULL,
    -- formation_id permet de relier un enseignant a une formation
    -- NULL signifie que ce champ peut etre vide
    formation_id INT NULL,
    -- FOREIGN KEY = cle etrangere
    FOREIGN KEY (formation_id) REFERENCES formation(id)
);

-- Reafficher les tables apres creation.
SHOW TABLES;

-- Ajouter un premier enseignant lie a la formation d'id 1.
INSERT INTO enseignant (nom, prenom, date_recrutement, matiere_enseignee, formation_id)
VALUES ('Dupont', 'Jean', '2020-01-15', 'Developpement web', 1);

-- Ajouter un deuxieme enseignant.
INSERT INTO enseignant (nom, prenom, date_recrutement, matiere_enseignee, formation_id)
VALUES ('Martin', 'Sophie', '2019-03-10', 'Maintenance informatique', 2);

-- Ajouter un troisieme enseignant.
INSERT INTO enseignant (nom, prenom, date_recrutement, matiere_enseignee, formation_id)
VALUES ('Durand', 'Pierre', '2021-06-20', 'Cybersecurite', 3);

-- Ajouter un quatrieme enseignant.
INSERT INTO enseignant (nom, prenom, date_recrutement, matiere_enseignee, formation_id)
VALUES ('Lefebvre', 'Marie', '2018-11-05', 'Comptabilite', 4);

-- Ajouter un cinquieme enseignant.
INSERT INTO enseignant (nom, prenom, date_recrutement, matiere_enseignee, formation_id)
VALUES ('Moreau', 'Luc', '2022-02-28', 'Marketing digital', 5);

-- Ajouter un sixieme enseignant.
INSERT INTO enseignant (nom, prenom, date_recrutement, matiere_enseignee, formation_id)
VALUES ('Garcia', 'Laura', '2017-09-12', 'Gestion de projet', 6);
