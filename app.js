const express = require('express');
const path = require('path');
const mongoose = require('mongoose')

const bodyParser = require('body-parser');
/* const User = require('./models/user'); */


const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

const adminRoutes = require('./routes/admin.js');
const shopRoutes = require('./routes/shop.js');
const notFound = require('./routes/not-found.js');


app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));

/* app.use((req, res, next)=>{
    User.findById("6410681590c18b1b9751e0ee")
    .then(user=>{
        req.user=new User(user.name, user.email, user.cart, user._id);
        next();
    })
    .catch(err=>{console.error(err)})
}) */

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(notFound);

mongoose
    .connect('mongodb+srv://elycruzdev:o6AHCTZ5LnRsyj0b@cluster0.detozxi.mongodb.net/shop?readPreference=primary')
    .then(result=>{
        app.listen(3000);
    }).catch(err=>{
        console.error(err);
    })  