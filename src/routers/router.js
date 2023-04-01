const express = require('express');
const app = express();
const hbs = require('express-handlebars');
const path = require('path');
const ProductModel = require('../models/Product');
const { log } = require('console');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.engine('hbs', hbs.engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../resources/views'));

app.post('/delete',async (req, res) => {
    const ids = req.body.id;
    console.log(ids);
    ProductModel.deleteOne({_id: ids})
    .then(() => res.redirect('back'));
})

app.get('/update_data', async (req, res) => {
    const data = await ProductModel.findOne({ '_id': `${req.query._id}` });

    res.render('update_data', {
        helpers: {
            setData() {
                let oldData = {
                    _id: (JSON.stringify(data._id).split('"'))[1],
                    name: data.name,
                    price: data.price,
                    quality: data.quality,
                    category: data.category,
                    deal: data.deal
                }
                return oldData;
            },
            getId() {
                return data._id;
            },
            getName() {
                return data.name;
            },
            getPrice() {
                return data.price;
            },
            getQuality() {
                return data.quality;
            },
            getCategory() {
                return data.category;
            },
            getDeal() {
                return data.deal;
            }
        }
    });
})

app.get('/add_data', (req, res) => {
    res.render('add_data');
})

app.get('/list', async (req, res) => {
    const list = await ProductModel.find({});

    console.log(req.query);

    res.render('list', {
        helpers: {
            getList() {
                let content = '';

                for (let item of list) {
                    content += `${(JSON.stringify(item._id).split('"'))[1]}^${item.name}^${item.price}^${item.quality}^${item.category}^${item.deal}#`;
                }

                return content;
            }
        }
    });
})

app.post('/list', async (req, res) => {

    if (req.body._id != undefined) {
        const dataUpdate = {
            name: req.body.name,
            price: req.body.price,
            quality: req.body.quality,
            category: req.body.category,
            deal: req.body.deal
        }
        ProductModel.updateOne({ _id: req.body._id }, { $set: dataUpdate })
            .then(() => res.redirect('list'));
    }
    else {
        const product = new ProductModel(req.body);
        await product.save();
    }

    const list = await ProductModel.find({});
    res.render('list', {
        helpers: {
            getList() {
                let content = '';

                for (let item of list) {
                    content += `${(JSON.stringify(item._id).split('"'))[1]}^${item.name}^${item.price}^${item.quality}^${item.category}^${item.deal}#`;
                }

                return content;
            }
        }
    });
})

app.get('/', (req, res) => {
    res.render('list');
})

module.exports = app;
