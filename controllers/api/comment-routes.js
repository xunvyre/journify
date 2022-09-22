const router = require('express').Router();
const {Comment} = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) =>
{
    Comment.findAll()
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err =>
    {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', withAuth, (req, res) =>
{
    Comment.create
    ({
        comment_text: req.body.comment_text,
        user_id: req.session.user_id,
        journal_id: req.body.journal_id
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err =>
    {
        console.log(err);
        res.status(400).json(err);
    });

});

router.delete('/:id', (req, res) =>
{
    //if we are able
});

module.exports = router;