const { bearer } = require('../strategies');
const repo = require('../repo');

const userBearer = bearer('user-bearer', async (payload, done) => {
    try {
        console.log('user AUTH', payload);
        const user = await repo.findById(payload.id);
        if (user)
            return done(null, user);
        throw { errorCode: 'UNAUTHORIZED' };
    } catch (err) {
        done({ errorCode: 'UNAUTHORIZED' });
    }
});


module.exports = {
    userBearer
};
