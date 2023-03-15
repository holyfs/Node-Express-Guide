const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');
const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');


const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

const adminRoutes = require('./routes/admin.js');
const shopRoutes = require('./routes/shop.js');
const notFound = require('./routes/not-found.js');


app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next)=>{
    User.findById("6410681590c18b1b9751e0ee")
    .then(user=>{
        req.user=user;
        next();
    })
    .catch(err=>{console.error(err)})
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(notFound);

mongoConnect(()=>{
    app.listen(3000);
});