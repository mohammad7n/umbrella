const { fnHandler } = require('@modules/utils');
const service = require('./service');

const register = fnHandler(async (req, res) => {
    const { body: userEntity } = req;
    const user = await service.register(userEntity);
    res.success(user);
});

const login = fnHandler(async (req, res) => {
    const {
        body: {
            username: email,
            password
        },
    } = req;
    const user = await service.login(email, password);
    res.success(user);
});


module.exports = {
    register,
    login
};
