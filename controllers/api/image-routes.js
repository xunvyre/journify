const router = require('express').Router();
const {Image} = require('../../models');
const uploadController = require('../../utils/upload-routes');
const upload = require('../../utils/upload');

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

router.post('/upload', upload.single("file"), uploadController.uploadFiles);

module.exports = router;