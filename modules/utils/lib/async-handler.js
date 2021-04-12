const functionHandler =
  fn =>
      (req, res, next) =>
          Promise
              .resolve(fn(req, res, next))
              .catch(next);

const objectHandler = (obj) => {
    for (const key in obj) {
        obj[key] = functionHandler(obj[key]);
    }
    return obj;
};

module.exports = {
    functionHandler,
    objectHandler
};
