const userService = require('./users.service');

const getAllUsers = (req, res) => {
    return userService.getAllUsers()
        .then((users) => {
            res.json(users);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
}

module.exports = {
    getAllUsers
}