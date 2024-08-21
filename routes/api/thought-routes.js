const router = require('express').Router();

const {
    getThought,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/ThoughtController');

// api/thought get all POST thought
router.route('/').get(getThought).post(createThought);

// api/thought/:thoughtId get one thought, PUT and DELETE by id
router.route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

    // /api/thought/:thoughtId/reaction POST new reaction
router.route('/:thoughtId/reaction')
    .post(createReaction);

// /api/thought/:thoughtId/reaction/:reactionId DELETE reaction by ID
router.router('/:thoughtId/reaction/reactionId')
    .delete(deleteReaction);

module.exports = router;
