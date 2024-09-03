// const { ObjectId } = require('mongoose').Types;
// const { json } = require('express');
// const { Thought, User } = require('../models');

// module.exports = {
//     // get all thoughts
//     async getThought(req, res) {
//         try {
//             const thought = await Thought.find().populate('user');
//             res.json(thought);
//         } catch (err) {
//             res.status(500).json(err);
//         }
//     },

//     // get a thought
//     async getSingleThought(req, res) {
//         try {
//             const thought = await Thought.findOne({ _id: req.params.thoughtId })
//                 .select('-__v');

//             if (!thought) {
//                 return res.status(404).json({ message: 'No thought with that ID' })
//             }

//             res.json(thought);
//         } catch (err) {
//             res.status(500).json(err);
//         }
//     },

//     // create a thought
//     async createThought(req, res) {
//         try {
//             const thought = await Thought.create(req.body);
//             res.json(thought);
//         } catch (err) {
//             console.log(err);
//             return res.status(500).json(err);
//         }
//     },

//     // delete a Thought
//     async deleteThought(req, res) {
//         try {
//             const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

//             if (!thought) {
//                 return res.status(404).json({ message: 'No thought exists' });
//             }

//             const dbThought = await User.findOneAndUpdate(
//                 { thought: req.params.thoughtId },
//                 { $pull: { thought: req.params.thoughtId } },
//                 { new: true }
//             );
           
//             if (!dbThought) {
//                 return res.status(404).json({
//                     message: 'Thought delete. But no thought found.',
//                 });
//             }

//             res.json({ message: 'Thought successfuly delete' });
//         } catch (err) {
//             console.log(err);
//             res.status(500).json(err);
//         }
//     },

//     // update a Thought
//     async updateThought(req, res) {
//         try {
//             const thought = await Thought.findOneAndUpdate(
//                 { _id: req.params.thoughtId },
//                 { $set: req.body },
//                 { runValidators: true, new: true }
//             );
            
//             if (!thought) {
//                 return res.status(404).json({ message: 'No thought exists!' });
//             }

//             res.json({ message: 'Thought successfuly update)' }) ;
//         } catch (err) {
//             res.status(500).json(err);
//         }
//     },

//     // add a reaction to a thought
//     async addReaction(req, res) {
//         console.log('You are adding a reaction');
//         console.log(req.body);

//         try {
//             const thought = await Thought.findOneAndUpdate(
//                 { _id: req.params.thoughtId },
//                 { $addToSet: { reaction: req.body } },
//                 { runValidator: true, new: true }
//             );

//             if (!thought) {
//                 return res
//                 .status(404)
//                 .json({ message: 'No thought found with that ID :(' });
//             }

//             res.json(thought);
//         } catch (err) {
//             res.status(500).json(err);
//         }
//     },

//     // remove reaction from a thought
//     async removeReaction(req, res) {
//         try {
//             const thought = await Thought.findOneAndUpdate(
//                 { _id: req.params.thoughtId },
//                 { $pull: { reaction: { _id: req.params.thoughtId } } },
//                 { runValidators: true, new: true }
//             );
//             if (!thought) {
//                 return res
//                 .status(404)
//                 .json({ message: 'No thought found with that ID :(' });
//             }

//             res.json(thought);
//         } catch (err) {
//             rest.status(500).json(err);
//         }
//     },
// };

const { Thought, User } = require("../models");

// get all thoughts
function getThoughts (req, res) {
    Thought.find({}). then((data) => {
        res.json(data);
    });
}

// add a thought
async function createThought(req, res) {
    try {
        const user = await User.findById(req.body.userId);
        if (user) {
            const thought = await Thought.create({
                thoughtText: req.body.thoughtText,
                username: user.username,
                userId: user._id,
            });
            // find another user and add thought
            await User.findByIdAndUpdate(
                req.body.userId,
                {$push: { thoughts: thought._id } }
            );
            res.json({ message: "Thought created!", thought });
        } else {
            res.status(404).json({ message: "Unable to create Thought!"});
        }
    } catch (err) {
        console.log(err);
        res.status(500)
    }
}

    // update thought
    function updateThought(req, res) {
        Thought.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((data) => {
            if (data) {
                res.status(200).json(data);
            } else {
                res.status(404).json({ message: "Invalid thought id"});
            }
        })
        .catch((err) => {
            res.status(404).json({ message: "Unable to update thought!" });
        });
    }

    // get single thought
    function getSingleThought(req, res) {
        Thought,findById(req.params.id)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(404).json({ message: "invalid thought id!" });
        });
    }

    // delete a thought
    async function deleteThought(rerq, res) {
        try {
            const thought = await Thought.findById(req.params.id);
            if (thought) {
                await Thought.deleteOne(thought);
                const user = await User.findByIdAndUpdate(thought.userId, {
                    $pull: {thoughts: thought._id },
                });
                res.status(200).json({ message: "Invalid thought id!" });
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Unable to delete thought!" });
        }
    }

    //  get all reaction
    async function getReactions(req, res) {
        try {
            const thought = await Thought.findById(req.params.id);
            res.json(thought.reactions);
        } catch (err) {
            res.status(404).json({ message: "Inalid thoughtId!" });
        }
    }

    // add a reaction to a thought
    async function addReaction(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(
                req.params.id,
                {
                    $push: { reactions: req.body},
                },
                { new: true }
            );
            res.json(thought);
        } catch (err) {
            res.status(404).json({ message: "Invalid thoughtId!"});
        }
    }

    // delete reaction
    async function deleteReaction(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                {
                    $pull: { reactions: {_id: req.params.reactionId } },
                },
                { new: true }
            );
            if (thought) {
                res.json(thought);
            } else {
                res.status(404).json ({ message: "invalid thoughtId!"});
            }
        } catch (err) {
            res.status(404).json({ message: "invalid thoughtId or reactionId!"});
        }
    }

    module.exports = {
        getThoughts,
        createThought,
        getSingleThought,
        deleteThought,
        updateThought,
        getReactions,
        addReaction,
        deleteReaction,
    }