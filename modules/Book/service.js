const axios = require('axios');

const thridPartyBookSearch = async query => {
    const apiResult = await axios.default.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
    const books = apiResult.data.items ? apiResult.data.items : [];
    return books;
};

module.exports = {
    thridPartyBookSearch
};
