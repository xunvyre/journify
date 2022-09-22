const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

router.get('/', (req, res) =>
{
    res.render('dashboard', {loggedIN: true});
});

module.exports = router;