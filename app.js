const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');
const mongoConnect = require('./util/database').mongoConnect;



const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

const adminRoutes = require('./routes/admin.js');
const shopRoutes = require('./routes/shop.js');
const notFound = require('./routes/not-found.js');


app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next)=>{
/*     User.findByPk(1)
    .then(user=>{
        req.user=user;
        next();
    })
    .catch(err=>{console.error(err)}) */
    next();
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(notFound);

mongoConnect(()=>{
    app.listen(3000);
});