const users = require('../../../data').schemas.users;

const getAllUsers = () => {
    return users.find({});
};

module.exports = {
    getAllUsers
};