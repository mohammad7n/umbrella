
const repo = require('./repo');
const service = require('./service');
const { fnHandler } = require('@modules/utils');

const createBook = fnHandler(async (req, res) => {
    const { body: book, user } = req;
    book.userId = user._id;
    const createdBook = await repo.create(book);
    res.success(createdBook);
});

const searchBooksWithPagination = fnHandler(async (req, res) => {
    const { query } = req;
    const books = await repo.searchBooksWithPagination(query);
    res.success(books);
});

const getBook = fnHandler(async (req, res) => {
    const { params: { bookId } } = req;
    const book = await repo.findById(bookId);
    res.success(book);
});

const updateBook = fnHandler(async (req, res) => {
    const { params: { bookId }, body: updateBook } = req;
    const updateResult = await repo.updateById(bookId, updateBook);
    res.success(updateResult);
});

const deleteBook = fnHandler(async (req, res) => {
    // Here we actuly delete Book from database wich is not recommended in most cases
    // it's better idea to soft delete instead of actual delete
    const { params: { bookId } } = req;
    const deleteResult = await repo.deleteById(bookId);
    res.success(deleteResult);
});

const thridPartyBookSearch = fnHandler(async (req, res) => {
    const { query: { q } } = req;
    const books = await service.thridPartyBookSearch(q);
    res.success(books);
});

module.exports = {
    createBook,
    searchBooksWithPagination,
    updateBook,
    deleteBook,
    getBook,
    thridPartyBookSearch
};
