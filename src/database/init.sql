CREATE DATABASE IF NOT EXISTS hodos_db;
USE hodos_db;

CREATE TABLE IF NOT EXISTS Utilisateurs (
    idu INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    pseudo VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    mot_de_passe VARCHAR(255) NOT NULL,
    sexe ENUM('M', 'F', 'Autre') NOT NULL,
    age INT,
    date_naissance DATE,
    adresse VARCHAR(255),
    commune VARCHAR(100),
    departement VARCHAR(100),
    pays VARCHAR(100),
    numero_telephone VARCHAR(20),
    situation_familiale ENUM('Célibataire', 'Couple', 'Famille'),
    avec_enfants BOOLEAN DEFAULT FALSE,
    age_enfants VARCHAR(255),
    points_disponibles INT DEFAULT 0,
    date_inscription DATETIME DEFAULT CURRENT_TIMESTAMP,
    derniere_connexion DATETIME,
    preferences_activites SET('Resto', 'Shopping', 'Culture')
);

CREATE TABLE IF NOT EXISTS Commercants (
    idc INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL,
    adresse_postale VARCHAR(255) NOT NULL,
    commune VARCHAR(100) NOT NULL,
    departement VARCHAR(100) NOT NULL,
    pays VARCHAR(100) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL,
    secteur_activite VARCHAR(100) NOT NULL,
    domaine_activite VARCHAR(100) NOT NULL,
    offres TEXT,
    horaires JSON,
    descriptif TEXT,
    photo VARCHAR(255),
    pmr BOOLEAN DEFAULT FALSE,
    email_contact VARCHAR(100),
    telephone VARCHAR(20),
    statut_abonnement ENUM('Gratuit', 'Payant') DEFAULT 'Gratuit'
);

CREATE TABLE IF NOT EXISTS QR_Codes (
    idq INT PRIMARY KEY AUTO_INCREMENT,
    idc INT,
    qrcode VARCHAR(255) NOT NULL,
    date_creation DATETIME DEFAULT CURRENT_TIMESTAMP,
    statut ENUM('Actif', 'Inactif') DEFAULT 'Actif',
    FOREIGN KEY (idc) REFERENCES Commercants(idc)
);

CREATE TABLE IF NOT EXISTS Defis (
    idd INT PRIMARY KEY AUTO_INCREMENT,
    idc INT,
    titre VARCHAR(100) NOT NULL,
    description TEXT,
    date_debut DATETIME NOT NULL,
    date_fin DATETIME NOT NULL,
    duree INT,
    points_attribues INT NOT NULL,
    statut ENUM('Actif', 'Terminé') DEFAULT 'Actif',
    FOREIGN KEY (idc) REFERENCES Commercants(idc)
);

CREATE TABLE IF NOT EXISTS Defis_Realises (
    iddr INT PRIMARY KEY AUTO_INCREMENT,
    idu INT,
    idd INT,
    date_realisation DATETIME DEFAULT CURRENT_TIMESTAMP,
    points_gagnes INT NOT NULL,
    FOREIGN KEY (idu) REFERENCES Utilisateurs(idu),
    FOREIGN KEY (idd) REFERENCES Defis(idd)
);

CREATE TABLE IF NOT EXISTS QR_Codes_Scannes (
    idqs INT PRIMARY KEY AUTO_INCREMENT,
    idu INT,
    idq INT,
    date_scan DATETIME DEFAULT CURRENT_TIMESTAMP,
    points_gagnes INT NOT NULL,
    FOREIGN KEY (idu) REFERENCES Utilisateurs(idu),
    FOREIGN KEY (idq) REFERENCES QR_Codes(idq)
);

CREATE TABLE IF NOT EXISTS Parcours (
    idp INT PRIMARY KEY AUTO_INCREMENT,
    idu INT,
    date_creation DATETIME DEFAULT CURRENT_TIMESTAMP,
    statut ENUM('En cours', 'Terminé', 'Abandonné') DEFAULT 'En cours',
    FOREIGN KEY (idu) REFERENCES Utilisateurs(idu)
);

CREATE TABLE IF NOT EXISTS Parcours_Commercants (
    idp INT,
    idc INT,
    PRIMARY KEY (idp, idc),
    FOREIGN KEY (idp) REFERENCES Parcours(idp),
    FOREIGN KEY (idc) REFERENCES Commercants(idc)
);

CREATE TABLE IF NOT EXISTS Lots (
    idl INT PRIMARY KEY AUTO_INCREMENT,
    idc INT,
    titre VARCHAR(100) NOT NULL,
    points_requis INT NOT NULL,
    conditions_attribution TEXT,
    quantite_disponible INT NOT NULL,
    date_expiration DATE,
    FOREIGN KEY (idc) REFERENCES Commercants(idc)
);

CREATE TABLE IF NOT EXISTS Points_Utilises (
    idpu INT PRIMARY KEY AUTO_INCREMENT,
    idu INT,
    idl INT,
    points_utilises INT NOT NULL,
    date_utilisation DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idu) REFERENCES Utilisateurs(idu),
    FOREIGN KEY (idl) REFERENCES Lots(idl)
);

-- Création de la table utilisateurs
CREATE TABLE IF NOT EXISTS utilisateurs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    mot_de_passe VARCHAR(255) NOT NULL,
    nom VARCHAR(100),
    prenom VARCHAR(100),
    pseudo VARCHAR(50) UNIQUE,
    sexe ENUM('M', 'F', 'Autre'),
    age INT,
    date_naissance DATE,
    adresse TEXT,
    commune VARCHAR(100),
    departement VARCHAR(100),
    pays VARCHAR(100),
    numero_telephone VARCHAR(20),
    situation_familiale ENUM('Célibataire', 'Couple', 'Famille'),
    avec_enfants BOOLEAN DEFAULT FALSE,
    age_enfants VARCHAR(50),
    preferences_activites JSON,
    points INT DEFAULT 0,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_modification TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    derniere_connexion TIMESTAMP,
    est_actif BOOLEAN DEFAULT TRUE,
    token_reset_mot_de_passe VARCHAR(255),
    date_expiration_token TIMESTAMP,
    tentatives_connexion INT DEFAULT 0,
    compte_bloque BOOLEAN DEFAULT FALSE,
    date_blocage TIMESTAMP
);

-- Index pour optimiser les recherches
CREATE INDEX idx_email ON utilisateurs(email);
CREATE INDEX idx_pseudo ON utilisateurs(pseudo);

-- Procédure stockée pour la connexion
DELIMITER //
CREATE PROCEDURE login_utilisateur(
    IN p_email VARCHAR(255),
    IN p_mot_de_passe VARCHAR(255)
)
BEGIN
    DECLARE v_utilisateur_id INT;
    DECLARE v_tentatives INT;
    DECLARE v_compte_bloque BOOLEAN;
    
    -- Vérifier si le compte est bloqué
    SELECT id, tentatives_connexion, compte_bloque 
    INTO v_utilisateur_id, v_tentatives, v_compte_bloque
    FROM utilisateurs 
    WHERE email = p_email;
    
    IF v_compte_bloque THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Compte temporairement bloqué. Veuillez réessayer plus tard.';
    END IF;
    
    -- Vérifier les credentials
    IF EXISTS (
        SELECT 1 
        FROM utilisateurs 
        WHERE email = p_email 
        AND mot_de_passe = p_mot_de_passe
    ) THEN
        -- Réinitialiser les tentatives et mettre à jour la dernière connexion
        UPDATE utilisateurs 
        SET tentatives_connexion = 0,
            derniere_connexion = CURRENT_TIMESTAMP
        WHERE email = p_email;
        
        -- Retourner les informations de l'utilisateur
        SELECT 
            id,
            email,
            nom,
            prenom,
            pseudo,
            points,
            sexe,
            age,
            date_naissance,
            adresse,
            commune,
            departement,
            pays,
            numero_telephone,
            situation_familiale,
            avec_enfants,
            age_enfants,
            preferences_activites
        FROM utilisateurs 
        WHERE email = p_email;
    ELSE
        -- Incrémenter les tentatives de connexion
        UPDATE utilisateurs 
        SET tentatives_connexion = tentatives_connexion + 1
        WHERE email = p_email;
        
        -- Bloquer le compte après 5 tentatives
        IF v_tentatives + 1 >= 5 THEN
            UPDATE utilisateurs 
            SET compte_bloque = TRUE,
                date_blocage = CURRENT_TIMESTAMP
            WHERE email = p_email;
        END IF;
        
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Email ou mot de passe incorrect';
    END IF;
END //
DELIMITER ; 