const express = require('express');
const path = require('path');
const mongoose = require('mongoose')

const bodyParser = require('body-parser');
const User = require('./models/user');


const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

const adminRoutes = require('./routes/admin.js');
const shopRoutes = require('./routes/shop.js');
const notFound = require('./routes/not-found.js');


app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById('5bab316ce0a7c75f783cb8a8')
      .then(user => {
        req.user = user;
        next();
      })
      .catch(err => console.log(err));
  });

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(notFound);

mongoose
    .connect('mongodb+srv://elycruzdev:o6AHCTZ5LnRsyj0b@cluster0.detozxi.mongodb.net/shop?readPreference=primary')
    .then(result=>{
        User.findOne().then(user => {
            if (!user) {
              const user = new User({
                name: 'Max',
                email: 'max@test.com',
                cart: {
                  items: []
                }
              });
              user.save();
            }
          });
        app.listen(3000);
    }).catch(err=>{
        console.error(err);
    })  