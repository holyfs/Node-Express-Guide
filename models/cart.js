const fs = require('fs');
const path = require('path');

const p = path.join(__dirname,'../data','cart.json');

module.exports = class Cart {
    static addProduct(id, productPrice){
        fs.readFile(p,(err, fileContent)=>{
            let cart = {products:[], totalPrice: 0};
            if(!err){
                cart = JSON.parse(fileContent);
            }
            const existingProductIndex = cart.products.findIndex(product => product.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            if(existingProduct){
                updatedProduct ={ ...existingProduct };
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products=[...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            }else{
                updatedProduct = { id: id, qty: 1 };
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totalPrice = cart.totalPrice + +productPrice;
            fs.writeFile(p, JSON.stringify(cart),(err)=>{
                if(err){
                    console.error(err);
                }
            });
        });
    };

    static deleteProduct(id, price){
        fs.readFile(p, (err, fileContent)=>{
            if(err){
                return;
            }
            const updatedCart ={ ...JSON.parse(fileContent) };
            const product = updatedCart.products.findIndex(prod => prod.id === id);
            if(!product){
                return;
            }
            const productQty = product.qty;
            updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);
            updatedCart.totalPrice = updatedCart.totalPrice - price * productQty;
            fs.writeFile(p, JSON.stringify(updatedCart),(err)=>{
                if(err){
                    console.error(err);
                }
            });
        });
    }

    static getCart(cb){
        fs.readFile(p, (err, fileContent)=>{
            const cart = JSON.parse(fileContent);
            if(err){
                cb(null);
            }else{
                cb(cart);
            }
        });
    };
};