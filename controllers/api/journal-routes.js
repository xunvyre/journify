const router = require('express').Router();
const {User, Journal, Comment} = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, (req, res) =>
{
    Journal.findAll
    ({
        attributes: ['id', 'user_id', 'title', 'entry'/*, example photo*/, 'updated_at'],
        order: [['updated_at', 'DESC']],
        include:
        [
            {
                model: Image,
                attributes: ['id', 'type', 'name', 'data', 'user_id', 'journal_id', 'created_at'],
                include:
                {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'journal_id', 'user_id', 'created_at'],
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
    .then(dbPostData => res.json(dbPostData))
    .catch(err =>
    {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', withAuth, (req, res) =>
{
    Journal.findOne
    ({
        where: {id: req.params.id},
        attributes: ['id', 'title', 'entry', 'created_at'],
        include:
        [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include:
                {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username'] //in case??
            }
        ]
    })
    .then(dbPostData =>
    {
        if (!dbPostData)
        {
            res.status(404).json({message: `No posts under this ID.`});
            return;
        }
        res.json(dbPostData);
    })
    .catch(err =>
    {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', withAuth, (req, res) =>
{
    Journal.create
    ({
        title: req.body.title,
        entry: req.body.entry,
        user_id: req.session.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err =>
    {
        console.log(err);
        res.status(500).json(err);
    });
});

router.put('/:id', (req, res) =>
{
    //this will be used to add new photos if we get to that point
});

router.delete('/:id', (req, res) =>
{
    //this will be used to delete journals if we get to that point
})

module.exports = router;