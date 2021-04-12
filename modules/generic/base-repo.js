const repo = (model) => ({
    create(fields) {
        return model.create(fields);
    },
    batchCreate(rows) {
        return model.insertMany(rows);
    },
    findByQuery(query) {
        return model.find(query);
    },
    findOneByQuery(query) {
        return model.findOne(query);
    },
    findById(id) {
        return model.findById(id);
    },
    deleteByQuery(query) {
        return model.deleteMany(query);
    },
    deleteOneByQuery(query) {
        return model.deleteOne(query);
    },
    deleteById(id) {
        return model.deleteOne({ _id: id });
    },
    updateByQuery(filter, query) {
        return model.updateMany(filter, query);
    },
    updateOneByQuery(filter, query) {
        return model.updateOne(filter, query);
    },
    updateById(_id, fields) {
        return model.findByIdAndUpdate(_id, fields, { new: true });
    },
    async aggregateWithPagination(pipeline = [], pageSize = 30, pageNumber = 1, { options } = {}) {
        pageSize = parseInt(pageSize) || 30;
        pageSize <= 0 && (pageSize = 30);
        pageNumber = parseInt(pageNumber) || 1;
        pageNumber <= 0 && (pageNumber = 1);
        pipeline.push(
            {
                $facet: {
                    pagination: [{ $count: 'totalRecords' }, { $addFields: { pageSize, pageNumber } }],
                    records: [
                        { $skip: (pageNumber - 1) * pageSize },
                        { $limit: pageSize },
                    ]
                },
            },
            {
                $unwind: '$pagination'
            }
        );
        const result = await model.aggregate(pipeline).option(options);
        return result.length ? result[0] : {
            pagination: {
                totalRecords: 0,
                pageSize,
                pageNumber
            },
            records: []
        };
    },
    aggregate(pipeline = []) {
        return model.aggregate(pipeline).exec();
    }
});

module.exports = repo;
