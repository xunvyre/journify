const router = require('express').Router();
const {Image} = require('../../models');

router.get('/', (req, res) =>
{
    Image.findAll()
    .then(dbImageData => res.json(dbImageData))
    .catch(err =>
    {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;