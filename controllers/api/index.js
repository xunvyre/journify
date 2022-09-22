const router = require('express').Router();

const userRoutes = require('./user-routes');
const journalRoutes = require('./journal-routes');
const commentRoutes = require('./comment-routes');
const imageRoutes = require('./image-routes');

router.use('/users', userRoutes);
router.use('/journals', journalRoutes);
router.use('/comments', commentRoutes);
router.use('/images', imageRoutes);

module.exports = router;