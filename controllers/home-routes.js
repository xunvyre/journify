const router = require('express').Router();
const sequelize = require('sequelize');
const {User, Journal, Comment} = require('../models');
const withAuth = require('../utils/auth');


router.get('/', withAuth, (req, res) =>
{
    Journal.findAll
    ({
        where: {user_id: req.session.user_id},
        attributes: ['id', 'title', 'updated_at'],
        include:
        [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData =>
    {
        const journals = dbPostData.map(journal => journal.get({plain: true}));
        res.render('homepage', {journals});
    })
    .catch(err =>
    {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/login', (req, res) =>
{
    if (req.session.loggedIN)
    {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/journals/:id', withAuth, (req, res) =>
{
    Journal.findOne
    ({
        where: {user_id: req.session.user_id, id: req.params.id},
        attributes: ['id', 'title', 'entry', 'updated_at'],
        include:
        [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'user_id', 'journal_id', 'created_at'],
                include:
                {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData =>
    {
        if(!dbPostData)
        {
            res.status(404).json({message: `No journal exists under this ID.`});
            return;
        }

        const journal = dbPostData.get({plain: true});
        res.render('single-journal', {journal});
    })
    .catch(err =>
    {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;