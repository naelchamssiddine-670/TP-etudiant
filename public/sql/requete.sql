-- Creer la base de donnees
CREATE DATABASE tp_etudiant;
USE tp_etudiant;

-- Afficher les bases de donnees existantes
SHOW DATABASES;

CREATE TABLE formation (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titre_de_formation VARCHAR(255) NOT NULL,
    lieu VARCHAR(255) NOT NULL,
    date_debut DATE NOT NULL,
    date_fin DATE NOT NULL,
    description_formation TEXT
);

SHOW TABLES;

INSERT INTO formation (titre_de_formation, lieu, date_debut, date_fin, description_formation)
VALUES ('Formation en developpement web', 'Mayotte', '2024-03-31', '2026-04-30', 'Apprenez les bases du developpement web avec HTML, CSS et JavaScript.');

INSERT INTO formation (titre_de_formation, lieu, date_debut, date_fin, description_formation)
VALUES ('Formation en maintenance informatique', 'Nantes', '2026-03-31', '2027-04-30', 'Decouvrez les techniques de maintenance informatique, y compris la gestion des systemes et la resolution de problemes.');

INSERT INTO formation (titre_de_formation, lieu, date_debut, date_fin, description_formation)
VALUES ('Formation en cybersecurite', 'Lyon', '2026-03-31', '2026-04-30', 'Apprenez les principes de la cybersecurite et comment proteger les systemes informatiques contre les menaces.');

INSERT INTO formation (titre_de_formation, lieu, date_debut, date_fin, description_formation)
VALUES ('Formation en comptabilite', 'La Reunion', '2026-03-31', '2026-04-30', 'Apprenez les bases de la comptabilite et comment gerer les etats financiers.');

INSERT INTO formation (titre_de_formation, lieu, date_debut, date_fin, description_formation)
VALUES ('Formation en marketing digital', 'Paris', '2026-03-31', '2026-04-30', 'Decouvrez les strategies de marketing digital pour promouvoir votre entreprise en ligne.');

INSERT INTO formation (titre_de_formation, lieu, date_debut, date_fin, description_formation)
VALUES ('Formation en gestion de projet', 'Marseille', '2026-03-31', '2026-04-30', 'Apprenez les competences necessaires pour gerer efficacement des projets et atteindre vos objectifs.');

CREATE TABLE etudiant (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(255) NOT NULL,
    prenom VARCHAR(255) NOT NULL,
    adresse_postale VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    mot_de_passe VARCHAR(255) NOT NULL,
    formation_id INT NULL,
    FOREIGN KEY (formation_id) REFERENCES formation(id)
);

CREATE TABLE enseignant (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(255) NOT NULL,
    prenom VARCHAR(255) NOT NULL,
    date_recrutement DATE NOT NULL,
    matiere_enseignee VARCHAR(255) NOT NULL,
    formation_id INT NULL,
    FOREIGN KEY (formation_id) REFERENCES formation(id)
);

SHOW TABLES;

INSERT INTO enseignant (nom, prenom, date_recrutement, matiere_enseignee, formation_id)
VALUES ('Dupont', 'Jean', '2020-01-15', 'Developpement web', 1);

INSERT INTO enseignant (nom, prenom, date_recrutement, matiere_enseignee, formation_id)
VALUES ('Martin', 'Sophie', '2019-03-10', 'Maintenance informatique', 2);

INSERT INTO enseignant (nom, prenom, date_recrutement, matiere_enseignee, formation_id)
VALUES ('Durand', 'Pierre', '2021-06-20', 'Cybersecurite', 3);

INSERT INTO enseignant (nom, prenom, date_recrutement, matiere_enseignee, formation_id)
VALUES ('Lefebvre', 'Marie', '2018-11-05', 'Comptabilite', 4);

INSERT INTO enseignant (nom, prenom, date_recrutement, matiere_enseignee, formation_id)
VALUES ('Moreau', 'Luc', '2022-02-28', 'Marketing digital', 5);

INSERT INTO enseignant (nom, prenom, date_recrutement, matiere_enseignee, formation_id)
VALUES ('Garcia', 'Laura', '2017-09-12', 'Gestion de projet', 6);
