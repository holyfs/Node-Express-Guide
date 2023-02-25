const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');

const sequelize = require('./util/database.js');

const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

const adminRoutes = require('./routes/admin.js');
const shopRoutes = require('./routes/shop.js');
const notFound = require('./routes/not-found.js');


app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(notFound);

sequelize
    .sync()
    .then(result => {
//        console.log(result);
        app.listen(3000);
    })
    .catch(err => {
        console.error(err);
    })
