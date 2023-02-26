const Product = require('../models/product.js');
const Cart = require('../models/cart.js');

exports.getProducts = (req, res, next)=>{
    Product.findAll()
    .then(products=>{
        res.render('shop/product-list', {
            prods: products, 
            pageTitle:'All products', 
            path:'/products'
        });
    })
    .catch(err=>{console.error(err)});
   
};

exports.getProduct = (req, res, next)=>{
    const productId = req.params.productId;
    Product.findByPk(productId)
    .then((product)=>{
            res.render('shop/product-detail',{
            product: product,
            pageTitle: product.title,
            path:'/products'
        })
    })
    .catch(err=>console.error(err))
    }


exports.getIndex = (req , res, next)=>{
    Product.findAll()
    .then(products=>{
        res.render('shop/index', {
            prods: products, 
            pageTitle:'Shop', 
            path:'/'
        });
    })
    .catch(err=>{console.error(err)});
};

exports.getCart = (req, res, next)=>{
    Cart.getCart(cart=>{
        Product.fetchAll(products=>{
            const cartProducts = [];
            for(let product of products){
                const cartProductData = cart.products.find(prod => prod.id === product.id)
                if(cartProductData){
                    cartProducts.push({productData: product, qty:cartProductData.qty});
                }
            }
            res.render('shop/cart',{
                pageTitle: 'Cart',
                path:'/cart',
                products: cartProducts
            });
        });
    });
};

exports.postCart = (req, res, next)=>{
    const productId = req.body.productId;
    Product.findById(productId, (product)=>{
        Cart.addProduct(productId, product.price);
    });
    res.redirect('/cart');
};

exports.postCartDeleteProduct = (req, res, next)=>{
    const productId= req.body.productId;
    Product.findById(productId, product=>{
        Cart.deleteProduct(productId, product.price);
        res.redirect('/');
    });
}

exports.getOrders = (req, res, next)=>{
    res.render('shop/orders',{
        pageTitle: 'Orders',
        path:'/orders'
    });
};

exports.getCheckout = (req, res, next)=>{
    res.render('shop/checkout',{
        path:'/checkout',
        pageTitle:'Checkout'
    });
};