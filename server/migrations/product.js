
const Product = require('../models/product');


let migrationProduct = (idCategory, transactions) => {
    Product.remove({}, (err) => {
        if (err) {
            console.log('Error deleting status');
        }

        seed(idCategory, transactions);
    });
};


let seed = (idCategory, transactions) => {

    for (let transaction of transactions) {

        transaction['category'] = idCategory;

        let schema = new Product(transaction);

        schema.save((err) => {

            if (err) {
                console.log('Error adding product', transaction);
            }
        });
    }

    console.log('Added products');
};


module.exports = {
    migrationProduct
};