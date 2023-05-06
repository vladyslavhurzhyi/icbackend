const app = require('./app');
require('dotenv').config();
const mongoose = require('mongoose');

const { DB_HOST, PORT } = process.env;
mongoose.set('strictQuery', true);
mongoose.Promise = global.Promise;

mongoose
    .connect(DB_HOST)
    .then(() => {
        app.listen(PORT);
        console.log('Database connection successful');
    })
    .catch((error) => {
        console.log(error.messsage);
        process.exit(1);
    });
