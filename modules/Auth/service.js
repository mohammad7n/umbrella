const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const repo = require('./repo');

const findByEmail = async (email) => {
    const [user] = await repo.findByQuery({ email });
    return user;
};

const register = async userEntity => {
    userEntity.email = userEntity.username.toLowerCase();
    const userExists = await findByEmail(userEntity.email);
    if (userExists)
        throw { errorCode: 'EMAIL_EXISTS' };
    userEntity.password = await bcrypt.hash(userEntity.password, 8);
    const result = await repo.create(userEntity);
    console.log(result);
    result.password = undefined;
    return result;
};

const login = async (email, password) => {
    const user = await findByEmail(email);
    if (!user)
        throw { errorCode: 'LOGIN_FAILED' };

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
        throw { errorCode: 'LOGIN_FAILED' };

    const token = jwt.sign(
        {
            id: user.id,
            role: 'user'
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '7d' }
    );
    return {
        token
    };
};

module.exports = {
    register,
    login
};
