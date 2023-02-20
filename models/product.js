const fs = require('fs');
const path = require('path');
const Cart = require('./cart.js');


const p = path.join(__dirname,'../data','products.json');
const getProductsFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        cb([]);
      } else {
        cb(JSON.parse(fileContent));
      }
    });
  };

module.exports = class Product {
    constructor(id, title, imageUrl, price, description){
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    };

    save() {
        getProductsFromFile(products => {
            if (this.id) {
                const existingProductIndex = products.findIndex(product => product.id === this.id);
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this;
                fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
            } else {
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
            }
        });
    };

    static deleteById(id){
        getProductsFromFile(products => {
            const product = products.find(prod => prod.id === id );
            const updatedproducts = products.filter(p => p.id !== id);
            fs.writeFile(p, JSON.stringify(updatedproducts), err =>{
                if(!err){
                    Cart.deleteProduct(id, product.price);
                }
            });
        });
    };

    static fetchAll(cb) {
        fs.readFile(p,(err,fileContent)=>{
            if(err){
                cb([]);
            }
            cb(JSON.parse(fileContent));
        });    
    };

    static findById(id, cb){
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id);
            cb(product);
        });
    };
}