const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class User {
  constructor(userName, email, id) {
    this.name = userName;
    this.email = email;
    this._id= id ? new mongodb.ObjectId(id):null;
  }
  save() {
    const db = getDb();
    return db
      .collection('users')
      .insertOne(this)
  }

  static findById(id){
    const db = getDb();
    return db
      .collection('users')
      .findOne({ _id: new mongodb.ObjectId(id) })
  }
}

module.exports = User;