const { Storage } = require('@google-cloud/storage');
const { format } = require('util');
const env = require('../config/env');
const { v4: uuidv4 } = require('uuid');
const uuid = uuidv4();

// Inicializa el cliente de Google Cloud Storage
const storage = new Storage({
    projectId: "app---la-leona",
    keyFilename: './serviceAccountKey.json' // Ruta hacia el archivo de credenciales
});

// Especifica el bucket de Firebase Storage
const bucket = storage.bucket("gs://app---la-leona.appspot.com");

/**
 * Subir el archivo a Firebase Storage
 * @param {object} file - Objeto que será almacenado en Firebase Storage
 * @param {string} pathImage - Ruta del archivo dentro del bucket
 */
const uploadImage = (file, pathImage) => {
    return new Promise((resolve, reject) => {
        if (pathImage) {
            let fileUpload = bucket.file(`${pathImage}`);
            const blobStream = fileUpload.createWriteStream({
                metadata: {
                    contentType: 'img/png',
                    metadata: {
                        firebaseStorageDownloadTokens: uuid,
                    }
                },
                resumable: false
            });

            blobStream.on('error', (error) => {
                console.log('Error al subir archivo a firebase', error);
                reject('Unable to upload at the moment.');
            });

            blobStream.on('finish', () => {
                // URL pública para acceder al archivo
                const url = format(`https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${fileUpload.name}?alt=media&token=${uuid}`);
                console.log('URL de Firebase Storage:', url);
                resolve(url);
            });

            blobStream.end(file.buffer);
        }
    });
}

module.exports = uploadImage;  // Exporta la función
