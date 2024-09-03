const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/ThoughtController');

// api/thought get all POST thought
router.route('/').get(getThoughts).post(createThought);

// api/thought/:thoughtId get one thought, PUT and DELETE by id
router.route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

    // /api/thought/:thoughtId/reaction POST new reaction
router.route('/:thoughtId/reaction')
    .post(addReaction);

// /api/thought/:thoughtId/reaction/:reactionId DELETE reaction by ID
router.route('/:thoughtId/reaction/reactionId')
    .delete(deleteReaction);

module.exports = router;
