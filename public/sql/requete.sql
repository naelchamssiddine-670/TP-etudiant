-- Créer la base de données
CREATE DATABASE tpetudiant;
-- Afficher les bases de données existantes
SHOW DATABASES;


CREATE TABLE formation IF NOT EXISTS (
    id INT PRIMARY KEY AUTO_INCREMENT, -- Identifiant unique pour chaque formation
    titre_de_formation VARCHAR(255) NOT NULL, -- Titre de la formation
    lieu VARCHAR(255) NOT NULL, -- Lieu de la formation
    date_debut DATE NOT NULL, -- Date de début de la formation
    date_fin DATE NOT NULL, -- Date de fin de la formation
    description_formation TEXT -- Description de la formation
);

-- Afficher les tables de la base de données
SHOW TABLES;

-- Ajouter une formation
INSERT INTO formation (titre_de_formation, lieu, date_debut, date_fin, description_formation)
VALUES ('Formation en développement web', 'Mayotte', '2024-03-31', '2026-04-30', 'Apprenez les bases du développement web avec HTML, CSS et JavaScript.');

INSERT INTO formation (titre_de_formation, lieu, date_debut, date_fin, description_formation)
VALUES ('Formation en maintenance informatique', 'Nantes', '2026-03-31', '2027-04-30', 'Découvrez les techniques de maintenance informatique, y compris la gestion des systèmes et la résolution de problèmes.');

INSERT INTO formation (titre_de_formation, lieu, date_debut, date_fin, description_formation)
VALUES ('Formation en cybersécurité', 'Lyon', '2026-03-31', '2026-04-30', 'Apprenez les principes de la cybersécurité et comment protéger les systèmes informatiques contre les menaces.');

INSERT INTO formation (titre_de_formation, lieu, date_debut, date_fin, description_formation)
VALUES ('Formation en comptabilité', 'La Réunion', '2026-03-31', '2026-04-30', 'Apprenez les bases de la comptabilité et comment gérer les états financiers.');

INSERT INTO formation (titre_de_formation, lieu, date_debut, date_fin, description_formation)
VALUES ('Formation en marketing digital', 'paris', '2026-03-31', '2026-04-30', 'Découvrez les stratégies de marketing digital pour promouvoir votre entreprise en ligne.');

INSERT INTO formation (titre_de_formation, lieu, date_debut, date_fin, description_formation)
VALUES ('Formation en gestion de projet', 'Marseille', '2026-03-31', '2026-04-30', 'Apprenez les compétences nécessaires pour gérer efficacement des projets et atteindre vos objectifs.');

CREATE TABLE etudiant IF NOT EXISTS (
    id INT PRIMARY KEY AUTO_INCREMENT, -- Identifiant unique pour chaque étudiant
    nom VARCHAR(255) NOT NULL, -- Nom de l'étudiant
    prenom VARCHAR(255) NOT NULL, -- Prénom de l'étudiant
    adresse_postale VARCHAR(255) NOT NULL UNIQUE, -- Adresse postale de l'étudiant
    email VARCHAR(255) NOT NULL UNIQUE, -- Adresse e-mail de l'étudiant
    mot_de_passe VARCHAR(255) NOT NULL, -- Mot de passe de l'étudiant
    -- J'ai ajouté une colonne pour stocker l'ID de la formation à laquelle l'étudiant est inscrit
    -- Cela permettra de faire le lien entre les étudiants et les formations
    formation_id INT, -- Clé étrangère vers la table formation
    FOREIGN KEY (formation_id) REFERENCES formation(id) -- Définir la clé étrangère
);