# Bibliothèque JavaScript pour la manipulation de fichiers JSON créée par Evan Perreau : https://dev-boost.fr

Cette bibliothèque JavaScript fournit des méthodes pour la manipulation de fichiers JSON. Elle permet de lire, écrire, mettre à jour et supprimer des données dans des fichiers JSON.

## Installation

Pour utiliser cette bibliothèque, assurez-vous d'avoir [Node.js](https://nodejs.org) installé sur votre machine. Ensuite, vous pouvez l'importer dans votre projet comme suit :

```javascript
const JsonPus = require('chemin/vers/main.js');
```

## Méthodes publiques

### `updateFileWithValuesAndKeys(filePath, data)`

Met à jour les données d'un fichier JSON.

- `filePath` : le chemin vers le fichier JSON dans lequel écrire.
- `data` : un tableau de clés et de valeurs `[["clé 1", "valeur 1"], ["clé 2", "valeur 2"]]` à ajouter ou mettre à jour.

```javascript
JsonPus.updateFileWithValuesAndKeys('chemin/vers/fichier.json', [["clé 1", "valeur 1"], ["clé 2", "valeur 2"]]);
```

### `getAllFromFile(filePath)`

Renvoie les clés et les valeurs d'un fichier JSON sous forme d'un tableau `[["clé 1", "valeur 1"], ["clé 2", "valeur 2"]]`.

- `filePath` : le chemin vers le fichier JSON.

```javascript
const data = JsonPus.getAllFromFile('chemin/vers/fichier.json');
console.log(data);
```

### `removeKeyPairsFromFile(filePath, keysToRemove)`

Supprime les clés et leurs valeurs d'un fichier JSON.

- `filePath` : le chemin vers le fichier JSON.
- `keysToRemove` : un tableau des clés à supprimer.

```javascript
JsonPus.removeKeyPairsFromFile('chemin/vers/fichier.json', ['clé1', 'clé2']);
```

### `getValueByKeyFromFile(filePath, key)` 

Renvoie la clé et la valeur d'un fichier JSON sous forme d'un tableau `["clé", "valeur"]`

- `filePath` : le chemin vers le fichier JSON.
- `key` : la clé dont nous voulons connaître le valeur.

```javascript
const data = JsonPus.getValueByKeyFromFile('chemin/vers/fichier.json', clé);
console.log(data);
```

### `getKeysByValueFromFile(filePath, value)`

Renvoie la/les clé(s) et la valeur d'un fichier JSON sous forme d'un tableau `[["clé 1", "valeur"]["clé 2", "valeur"]]`

- `filePath` : le chemin vers le fichier JSON.
- `value` : la valeur dont nous voulons connaître la/les clé(s).

```javascript
const data = JsonPus.getValueByKeyFromFile('chemin/vers/fichier.json', valeur);
console.log(data);
```

### `deleteFile(filePath)`

Supprime un fichier JSON

- `filePath` : le chemin vers le fichier JSON.

```javascript
JsonPus.deleteFile('chemin/vers/fichier.json');
```

### `createFile(filePath, data)`

Crée un fichier JSON

- `filePath` : le chemin vers le fichier JSON.
- `data` : un tableau de clés et de valeurs `[["clé 1", "valeur 1"], ["clé 2", "valeur 2"]]` à ajouter au fichier créé.

```javascript
JsonPus.createFile('chemin/vers/fichier.json', [["clé 1", "valeur 1"], ["clé 2", "valeur 2"]]);
```

### `removeAllKeyPairsFromFile(filePath)`

Supprime toutes les clés d'un fichier JSON

- `filePath` : le chemin vers le fichier JSON.

```javascript
JsonPus.removeAllKeyPairsFromFile('chemin/vers/fichier.json');
```