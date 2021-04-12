const Ajv = require('ajv');

const validator = (section, schemas) => {
    const ajv = new Ajv({
        allErrors: true,
        schemas
    });

    return (schemaId) => {
        const validate = ajv.getSchema(schemaId);
        return async (req, res, next) => {
            const valid = await validate(req[section]);
            if (!valid) {
                next(validate.errors);
            } else {
                next();
            }
        };
    };
};

module.exports = validator;
