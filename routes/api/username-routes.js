const router = require('express').Router();

const {
    getUser,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/UserController');

// /api/user/:userId GET one user, PUT and DELETE by user's ID
router.route('/').get(getUser).post(createUser);

// /api/users/:userId GET one user, PUT and DELETE by user's ID
router.route('/:userId')
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser);

// /api/user/:userId/friends/:friendId POST and DELETE a friend by ID
router.route('/:userId/friend/:friendId')
.post(addFriend)
.delete(removeFriend);

module.exports = router;
