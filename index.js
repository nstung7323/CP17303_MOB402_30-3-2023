const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const uriMongoDB = 'mongodb+srv://t07032003:82EKsSgS9DiAuDyn@demo.cufzg2b.mongodb.net/test';
const router = require('./src/routers/router');


app.use(express.urlencoded({
    extended: true,
}));
app.use(express.json());

mongoose.connect(uriMongoDB);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});

app.use(router);

app.listen(port);