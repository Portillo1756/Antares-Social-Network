const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

// Aggregate function to get the number of user overall
const userCount = async () => {
    const numberOfUser = await User.aggregate()
        .count('userCount');
    return numberOfUser;
}

module.exports = {

    // get all user
    async getUser(req, res) {
        try { 
            const user = await User.find();

            const userObj = {
                user,
                userCount: await userCount(),
            };

            res.json(userObj);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // get a single user
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
            .populate("thought")
            .populate("user")
            .select('-__v');

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' })
            }
            res.json(user);
            } catch (err) {
            res.status(500).json(err);
        }
    },

    // create a new User
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Delete a User
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: 'No such user exist' });  
            }
            
            const thought = await Thought.findOneAndUpdate(
                { user: req.params.userId },
                { $pull: { user: req.params.userId } },
                { new: true } 
            );

            if (!thought) {
                return res.status(404).json({
                    message: 'User delete.'
                })
            }

            res.json(user);
            }catch (err) {
            res.status(500).json(err);
        }
    },

    // add an thought to a user
    async addThought(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { thought: req.body }},
                { runValidators: true, new: true }
            );

            if (!student) {
                return res
                    .status(404)
                    .json({ message: 'No user found with that ID :( '});
            }

            res.json(user);
            }catch (err) {
            res.status(500).json(err);
        }
    },
    
    // remove thought from a user
    async removeThought(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { thought: { thoughtId: req.params.thoughtId } } },
                { runValidators: true, new: true }
            );

            if (!user) {
                return res
                    .status(404)
                    .json({ message: 'No user found with that ID :(' });
            }

            res.json(student);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};
