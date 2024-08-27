const router = require('express').Router();
const thoughtRoutes = require('./thought-routes');
const usernameRoutes = require('./username-routes');

router.use('/username', usernameRoutes);
router.use('/thought', thoughtRoutes);

module.exports = router;