// Bibliothèque JavaScript pour la manipulation de fichiers JSON créée par Evan Perreau : https://dev-boost.fr

const path = require('path');
const fs = require('fs');

////////////////////////
// Méthodes publiques //
////////////////////////


// Met à jour les données d'un fichier JSON
// Prend en paramètre un tableau de clés et de valeurs [["clé 1", "valeur 1"], ["clé 2", "valeur 2"]] et le chemin vers le fichier JSON dans lequel écrire.
function updateFileWithValuesAndKeys(filePath, data) {
    // Lecture du contenu existant du fichier JSON
    fs.readFile(filePath, 'utf8', (err, fileData) => {
        if (err) {
            console.error(`Une erreur s'est produite lors de la lecture du fichier :`, err);
            return;
        }

        let jsonData = {};

        try {
            // Conversion du contenu en objet JSON
            jsonData = JSON.parse(fileData);
        } catch (parseError) {
            console.error(`Une erreur s'est produite lors de la lecture du fichier JSON :`, parseError);
            return;
        }

        // Ajout des nouvelles données au contenu existant
        for (let i = 0; i < data.length; i++) {
            const key = data[i][0];
            const value = data[i][1];
            jsonData[key] = value;
        }

        // Conversion de l'objet JSON mis à jour en une chaîne JSON
        const newData = JSON.stringify(jsonData, null, 2);

        // Écriture de la nouvelle chaîne JSON dans le fichier
        fs.writeFile(filePath, newData, 'utf8', (writeErr) => {
            if (writeErr) {
                console.error(`Une erreur s'est produite lors de l\'écriture dans le fichier :`, writeErr);
            } else {
                console.log(`Les données ont été mise à jour avec succès dans le fichier.`);
            }
        });
    });
}


// Renvoie les clés et les valeurs d'un fichier JSON sous forme d'un tableau [["clé 1", "valeur 1"], ["clé 2", "valeur 2"]]
// Prend en paramètre le chemin vers le fichier JSON dans lequel écrire.
function getAllFromFile(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        const jsonData = JSON.parse(data);

        // Création d'un tableau pour stocker les clés et les valeurs
        const keysAndValues = [];

        // Parcours de chaque propriété dans le JSON
        for (let key in jsonData) {
            if (jsonData.hasOwnProperty(key)) {
                const value = jsonData[key];

                // Ajout de la clé et de la valeur dans le tableau
                keysAndValues.push([key, value]);
            }
        }

        return keysAndValues;
    } catch (err) {
        // Affichage d'un message d'erreur si le fichier n'est pas lisible et retourne un tableau vide
        console.error('Une erreur s\'est produite lors de la lecture du fichier JSON :', err);
        return [];
    }
}


// Renvoie la clé et la valeur d'un fichier JSON sous forme d'un tableau ["clé", "valeur"]
// Prend en paramètre le chemin vers le fichier JSON et la clé dont nous voulons connaître la valeur.
function getValueByKeyFromFile(filePath, key) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        const jsonData = JSON.parse(data);
        // Vérification si la clé existe dans l'objet JSON
        if (jsonData.hasOwnProperty(key)) {
            // Récupération de la valeur correspondante à la clé
            const value = jsonData[key];
            // Retourne un tableau contenant la clé et la valeur
            return [key, value];
        } else {
            // Affichage d'un message d'erreur si la clé n'existe pas et retourne un tableau vide
            console.log(`La clé "${key}" n'existe pas dans le fichier JSON.`);
            return [];
        }
    } catch (err) {
        // Affichage d'une erreur en cas de problème de lecture du fichier et retourne un tableau vide
        console.error('Une erreur s\'est produite lors de la lecture du fichier JSON :', err);
        return [];
    }
}

// Renvoie la/les clé(s) et la valeur d'un fichier JSON sous forme d'un tableau [["clé 1", "valeur"]["clé 2", "valeur"]]
// Prend en paramètre le chemin vers le fichier JSON et la valeur dont nous voulons connaître la/les clé(s).
function getKeysByValueFromFile(filePath, value) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        const jsonData = JSON.parse(data);

        const keys = [];
        // Parcours de chaque propriété de l'objet JSON
        for (let key in jsonData) {
            // Vérification si la propriété appartient réellement à l'objet
            if (jsonData.hasOwnProperty(key)) {
                // Récupération de la valeur correspondante à la clé
                const val = jsonData[key];
                // Vérification si la valeur correspond à celle recherchée 
                if (val === value) {
                    // Ajoute la clé au tableau des clés correspondantes
                    keys.push(key);
                }
            }
        }
        // Vérification s'il y a des clés correspondantes
        if (keys.length > 0) {
            // Retourne un tableau contenant les clés et la valeur
            return keys.map(key => [key, value]);
        } else {
            // Affichage d'un message d'erreur si aucune clé ne correspond et retourne un tableau vide
            console.log(`Aucune clé ne correspond à la valeur "${value}" dans le fichier JSON.`);
            return [];
        }
    } catch (err) {
        // Affichage d'une erreur en cas de problème de lecture du fichier et retourne un tableau vide
        console.error('Une erreur s\'est produite lors de la lecture du fichier JSON :', err);
        return [];
    }
}


// Supprime un fichier JSON
// Prend en paramètre le chemin vers le fichier JSON
function deleteFile(filePath) {
    // Vérifier l'existence du fichier JSON
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // Le fichier n'existe pas
                console.log(`Le fichier JSON "${filePath}" n'existe pas.`);
            } else {
                // Erreur lors de l'accès au fichier
                console.error(`Une erreur s'est produite lors de l'accès au fichier JSON "${filePath}" :`, err);
            }
        } else {
            // Suppression du fichier JSON
            try {
                fs.unlinkSync(filePath);
                console.log(`Le fichier JSON "${filePath}" a été supprimé avec succès.`);
            } catch (err) {
                // Erreur lors de la suppression du fichier
                console.error(`Une erreur s'est produite lors de la suppression du fichier JSON "${filePath}" :`, err);
            }
        }
    });
}

// Crée un fichier JSON
// Prend en paramètre le chemin du fichier JSON à créer et un tableau de clés et de valeurs [["clé 1", "valeur 1"], ["clé 2", "valeur 2"]] à y écrir
function createFile(filePath, data) {
    // Récupérer le répertoire du fichier
    const directoryPath = path.dirname(filePath);

    // Vérifier l'existence du répertoire
    fs.access(directoryPath, fs.constants.F_OK, (err) => {
        if (err) {
            // Le répertoire n'existe pas
            console.log(`Le répertoire "${directoryPath}" n'existe pas.`);
        } else {
            try {
                // Crée le fichier et y écrit les données
                fs.writeFileSync(filePath, '{}');
                if(data){
                    updateFileWithValuesAndKeys(filePath, data);
                }
                console.log(`Le fichier JSON "${filePath}" a été créé avec succès.`);
            } catch (err) {
                console.error(`Une erreur s'est produite lors de la création du fichier JSON "${filePath}" :`, err);
            }
        }
    });
}

// Supprimer les clés et leurs valeurs
// Prend en paramètre le chemin vers le fichier JSON et un tableau de clé(s) à supprimer ["clé 1", "clé 2"]
function removeKeyPairsFromFile(filePath, keysToRemove) {
    try {
        // Vérification si le fichier existe
        if (!fs.existsSync(filePath)) {
            console.log(`Le fichier "${filePath}" n'existe pas.`);
            return;
        }

        // Lecture du contenu du fichier JSON
        const jsonData = fs.readFileSync(filePath, 'utf-8');

        // Vérification si le fichier est vide
        if (jsonData.trim() === '') {
            console.log(`Le fichier "${filePath}" est vide.`);
            return;
        }

        // Conversion des données JSON en objet JavaScript
        const data = JSON.parse(jsonData);

        // Suppression des clés et de leurs valeurs
        keysToRemove.forEach((key) => {
            if (data.hasOwnProperty(key)) {
                delete data[key];
                console.log(`La clé "${key}" a été supprimée du fichier JSON "${filePath}".`);
            } else {
                console.log(`La clé "${key}" n'existe pas dans le fichier JSON "${filePath}".`);
            }
        });

        // Conversion de l'objet JavaScript en JSON
        const updatedJsonData = JSON.stringify(data, null, 2);

        // Écriture des données mises à jour dans le fichier JSON
        fs.writeFileSync(filePath, updatedJsonData);

        console.log(`Les clés spécifiées ont été supprimées du fichier JSON "${filePath}".`);
    } catch (err) {
        console.error(`Une erreur s'est produite lors de la suppression des clés du fichier JSON "${filePath}" :`, err);
    }
}

// Supprime toutes les clés d'un fichier JSON
// Prend en paramètre le chemin vers le fichier JSON
function removeAllKeyPairsFromFile(filePath) {
    try {
        // Vérification si le fichier existe
        if (!fs.existsSync(filePath)) {
            console.log(`Le fichier "${filePath}" n'existe pas.`);
            return;
        }

        // Lecture du contenu du fichier JSON
        const jsonData = fs.readFileSync(filePath, 'utf-8');

        // Vérification si le fichier est vide
        if (jsonData.trim() === '') {
            console.log(`Le fichier "${filePath}" est vide.`);
            return;
        }

        // Conversion des données JSON en objet JavaScript
        const data = JSON.parse(jsonData);

        // Suppression de toutes les clés
        const keysToRemove = Object.keys(data);
        keysToRemove.forEach((key) => {
            delete data[key];
            console.log(`La clé "${key}" a été supprimée du fichier JSON "${filePath}".`);
        });

        // Conversion de l'objet JavaScript en JSON
        const updatedJsonData = JSON.stringify(data, null, 2);

        // Écriture des données mises à jour dans le fichier JSON
        fs.writeFileSync(filePath, updatedJsonData);

        console.log(`Toutes les clés ont été supprimées du fichier JSON "${filePath}".`);
    } catch (err) {
        console.error(`Une erreur s'est produite lors de la suppression des clés du fichier JSON "${filePath}" :`, err);
    }
}

module.exports = {
    updateFileWithValuesAndKeys : updateFileWithValuesAndKeys,
    getAllFromFile : getAllFromFile,
    getValueByKeyFromFile : getValueByKeyFromFile,
    getKeysByValueFromFile : getKeysByValueFromFile,
    deleteFile : deleteFile,
    createFile : createFile,
    removeKeyPairsFromFile : removeKeyPairsFromFile,
    removeAllKeyPairsFromFile : removeAllKeyPairsFromFile
};