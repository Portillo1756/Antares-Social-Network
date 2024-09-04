const { User, Thought } = require('../models');

module.exports = {

    // get all user
    async getUser(req, res) {
        try { 
            const user = await User.find();

            res.json(user);
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
            .populate("friends")
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

    // uptate a user
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            
            if (!user) {
                return res.status(404).json({ message: 'No user exists!' });
            }

            res.json({ message: 'User successfuly update.)' }) ;
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

    // Add friend to user
    async addFriend (req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: {friends: req.params.friendId }},
                { runValidators: true, new: true }
            );
            
            if (!user) {
                return res.status(404).json({ message: 'No friend exists!' });
            }

            res.json({ message: 'Friend successfuly added!)' }) ;
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Delete a friend to user
    async removeFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: {friend: req.params.friendId }},
                { runValidators: true, new: true }
            );
            
            if (!user) {
                return res.status(404).json({ message: 'No friend exists!' });
            }

            res.json({ message: 'Friend successfuly remove.)' }) ;
        } catch (err) {
            res.status(500).json(err);
        }
    },
};
