const mongodb= require('mongodb');
const mongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
    mongoClient.connect('mongodb+srv://elycruzdev:o6AHCTZ5LnRsyj0b@cluster0.detozxi.mongodb.net/?retryWrites=true&w=majority')
        .then(client => {
            console.log('Connected!');
            callback(client);
        })
        .catch(err => {
            console.error(err);
        });
}

module.exports = mongoConnect;