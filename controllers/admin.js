const Product = require('../models/product.js');

exports.getAddProduct = (req, res, next)=>{
    res.render('admin/edit-product', {pageTitle:'Add Product', path:'/admin/add-product', editing:false});    
};

exports.postAddProduct = (req, res, next)=>{
    /*     const obj = JSON.parse(JSON.stringify(req.body)) */
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description.trim();
    Product.create({
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description
    })
    .then(result=>{
        //console.log(result);
        console.log('Created Product');
    })
    .catch(err=>{console.error(err)});
};

exports.getEditProduct = (req, res, next) => {
    const editMode=req.query.edit;
    if(!editMode){
        return res.redirect('/');
    }
    const productId = req.params.productId;
    Product.findByPk(productId)
    .then(product=>{
        if(!product){
            return res.redirect('/');
        }
        res.render('admin/edit-product',
            {
                pageTitle: 'Edit Product',
                path: '/admin/edit-product',
                editing: editMode,
                product: product
            });
    })
    .catch(err=>{console.error(err)}) 
};

exports.postEditProduct = (req, res, next) => {
    const productId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDescription = req.body.description;
    Product.findByPk(productId)
        .then(product => {
            product.title = updatedTitle;
            product.price = updatedPrice;
            product.imageUrl = updatedImageUrl;
            product.description = updatedDescription;
            return product.save();
        })
        .then(result=>{
            console.log('UPDATED PRODUCT');
            res.redirect('/admin/products');
        })
        .catch(err => console.error(err));
}

exports.getProducts = (req, res, next)=>{
    Product.findAll()
    .then((products)=>{
        res.render('admin/products', {
            prods: products, 
            pageTitle:'Admin Products', 
            path:'/admin/products'
        })
    }) 
    .catch(err=>{console.error(err)})
}

exports.postDeleteProduct=(req, res, next)=>{
    const productId = req.body.productId;
    Product.deleteById(productId);
    res.redirect('/admin/products');
}