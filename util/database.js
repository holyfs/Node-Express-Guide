const Sequelize = require('sequelize');

exports.sequelize = new Sequelize('node-complete','root','123456',{dialect: 'mysql', host:'localhost'});
