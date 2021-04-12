const model = require('./model');
const genericMethod = require('@modules/generic')(model);

const searchBooksWithPagination = async ({ q, pageSize, pageNumber }) => {
    const books = await genericMethod.aggregateWithPagination([
        {
            '$match': {
                '$or': [{ author: { $regex: q, $options: 'i' } },
                    { title: { $regex: q, $options: 'i' } },
                    { category: { $regex: q, $options: 'i' } }]
            }
        }
    ], pageSize, pageNumber);
    return books;
};

module.exports = {
    ...genericMethod,
    searchBooksWithPagination
};
