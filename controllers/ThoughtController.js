const { Thought, User } = require('../models');

module.exports = {
    // get all thoughts
    async getThought(req, res) {
        try {
            const thought = await Thought.find().populate('user');
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // get a thought
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
                .populate('user');

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' })
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // create a thought
    async createThought(req, res) {
        try {
            const course = await Thought.create(req.body);
            res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // delete a Thought
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

            if (!thought) {
                res.status(404).json({ message: 'No course with that ID' });
            }

            await User.deleteMany({ _id: {$in: thought.user } });
            res.json({ message: 'Thought and User deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // update a Thought
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            
            if (!thought) {
                res.status(404).json({ message: 'No thought with this ID!' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};