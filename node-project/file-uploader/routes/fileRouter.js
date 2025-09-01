const { Router } = require('express');
const fileController = require('../controllers/fileController');

const fileRouter = Router();

fileRouter.get('/:id', fileController.fileGet);
fileRouter.get('/update/:id', fileController.fileUpdateGet);
fileRouter.post('/update/:id', fileController.fileUpdatePost);
fileRouter.get('/delete/:id', fileController.fileDeleteGet);
fileRouter.get('/download/:id', fileController.fileDownloadGet);

module.exports = fileRouter;