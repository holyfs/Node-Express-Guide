const mongodb= require('mongodb');
const mongoClient = mongodb.MongoClient;
require('dotenv').config()


let _db;

const mongoConnect = (callback) => {
    mongoClient.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.detozxi.mongodb.net/?retryWrites=true&w=majority`)
        .then(client => {
            console.log('Connected!');
            _db = client.db()
            callback(client);
        })
        .catch(err => {
            console.error(err);
            throw err;
        });
}

const getDb = () =>{
    if(_db){
        return _db
    }
    throw new Error('No database Found!');
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;