const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');

const sequelize = require('./util/database.js');
const Product = require('./models/product.js');
const User = require('./models/user.js');
const Cart = require('./models/cart.js');
const CartItem = require('./models/cart-item.js');


const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

const adminRoutes = require('./routes/admin.js');
const shopRoutes = require('./routes/shop.js');
const notFound = require('./routes/not-found.js');


app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next)=>{
    User.findByPk(1)
    .then(user=>{
        req.user=user;
        next();
    })
    .catch(err=>{console.error(err)})
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(notFound);

Product.belongsTo(User, { constraits: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsToMany(Product, {through: CartItem});
Product.belongsToMany(Cart, {through: CartItem});

sequelize
//    .sync({ force: true })
    .sync()
    .then(result => {
        return User.findByPk(1);
//        console.log(result);
    })
    .then(user => {
        if (!user) {
            User.create({ name: 'Ely', email: 'test@test.es' })
        }
        return user;
    })
    .then(user=>{
//        console.log(user);
        return user.createCart();
    })
    .then(cart=>{
        app.listen(3000);
    })
    .catch(err => {
        console.error(err);
    })
