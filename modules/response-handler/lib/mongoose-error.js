const getDupKey = (err) => {
    return `${Object.keys(err.keyPattern)[0].toUpperCase()}_EXISTS`;
};

const handler = (err) => {
    switch (err.code) {
    case 11000:
        return getDupKey(err);
    default:

    }
};

module.exports = handler;
