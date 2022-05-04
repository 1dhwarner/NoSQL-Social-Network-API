const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

// Aggregate function to get the number of users overall
const headCount = async () =>
    User.aggregate()
        .count('userCount')
        .then((numberOfUsers) => numberOfUsers);

module.exports = {
    getUsers(req, res) {
        User.find()
            .then(async (users) => {
                const userObj = {
                    users,
                    headCount: await headCount(),
                };
                return res.json(userObj);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // get a single user
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .then(async (user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json({
                        user,
                    })
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },

    // create a new user
    // createUser(req, res) {
    //     User.create(req.body)
    //         .then((user) => res.json(user))
    //         .catch((err) => res.status(500).json(err));
    // },
    createUser(req, res) {
        const newUser = new User(req.body);
        newUser.save();
        if (newUser) {
            res.status(200).json(newUser);
        } else {
            console.log('Whoops, something went wrong');
            res.status(500).json({ message: 'Whoops, something went wrong' });
        }
    },

    deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No such user exists' })
                    // what's the syntax for 'if not a user, return the message above'??
                    : res.json({ message: 'Student successfully deleted' })
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // need to add / remove friend 
};