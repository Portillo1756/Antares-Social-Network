const { ObjectId } = require('mongoose').Types;
const { json } = require('express');
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
                .select('-__v');

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
            const thought = await Thought.create(req.body);
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
                return res.status(404).json({ message: 'No thought exists' });
            }

            const dbThought = await User.findOneAndUpdate(
                { thought: req.params.thoughtId },
                { $pull: { thought: req.params.thoughtId } },
                { new: true }
            );
           
            if (!dbThought) {
                return res.status(404).json({
                    message: 'Thought delete. But no thought found.',
                });
            }

            res.json({ message: 'Thought successfuly delete' });
        } catch (err) {
            console.log(err);
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
                return res.status(404).json({ message: 'No thought exists!' });
            }

            res.json({ message: 'Thought successfuly update)' }) ;
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // add a reaction to a thought
    async addReaction(req, res) {
        console.log('You are adding a reaction');
        console.log(req.body);

        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reaction: req.body } },
                { runValidator: true, new: true }
            );

            if (!thought) {
                return res
                .status(404)
                .json({ message: 'No thought found with that ID :(' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // remove reaction from a thought
    async removeReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reaction: { _id: req.params.thoughtId } } },
                { runValidators: true, new: true }
            );
            if (!thought) {
                return res
                .status(404)
                .json({ message: 'No thought found with that ID :(' });
            }

            res.json(thought);
        } catch (err) {
            rest.status(500).json(err);
        }
    },
};