const mongoose = require('mongoose');
const Promise = require('bluebird');
const debug = require('debug')('mobisoft:server');
function mongooseConf() {
    Promise.promisifyAll(mongoose);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useUnifiedTopology', true);
    mongoose.set('debug', true);
    mongoose
        .connect(`mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DB}`, {
            useNewUrlParser: true
        })
        .then(() => {
            debug('mongo connection was successful');
        })
        .catch(err => console.error('mongod err', err));
}
mongooseConf();
