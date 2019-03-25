
const express = require('express');

const Product = require('../../models/product');

const { verifyToken } = require('../../middlewares/authentication');

const app = express();


app.get('/api/product', verifyToken, (req, res) => {

    Product.find({ description: new RegExp(req.query.description, 'i') })
        .sort({ description: 1 })
        .exec((err, data) => {

            if (err) {
                return res.status(400).json({
                    success: false,
                    err
                });
            }

            Product.count({}, (err, count) => {
                res.json({
                    success: true,
                    quantity: count,
                    products: data
                });
            });
        });
});


app.get('/api/product/:id', verifyToken, (req, res) => {

    Product.find({ _id: req.params.id})
        .sort({ description: 1 })
        .exec((err, data) => {

            if (err) {
                return res.status(400).json({
                    success: false,
                    err
                });
            }

            res.json({
                success: true,
                product: data.length === 1 ? data[0] : {},
                quantity: data.length
            });
        });
});


app.get('/api/product-by-category', verifyToken, (req, res) => {

    Product.find({ category: req.query.category })
        .sort({ description: 1 })
        .exec((err, data) => {

            if (err) {
                return res.status(400).json({
                    success: false,
                    err
                });
            }

            Product.count({}, (err, count) => {
                res.json({
                    success: true,
                    quantity: count,
                    products: data
                });
            });
        });
});


module.exports = app;