const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function fileGet(req, res) {
console.log(req.params);
    const file = await prisma.file.findUnique({
        where: {
            id: Number(req.params.id)
        }
    });

    let sizeInKb = file.size / 1024;
    let sizeInMb = file.size / (1024 * 1024);
    if (sizeInKb < 100) {
        file.size = file.size + 'bytes';
    } else if (sizeInKb > 100 && sizeInKb < 1000) {
        file.size = sizeInKb.toFixed(2) + 'KB';
    } else if (size > 1000) {
        file.size = sizeInMb.toFixed(2) + 'MB';
    }
    
    res.render('file-details', {
        file
    });
}

async function fileUpdateGet(req, res) {
    const { id } = req.params;
    const file = await prisma.file.findUnique({
        where: {
            id: Number(id)
        }
    });

    res.render('file-update', {
        file
    });
}

async function fileUpdatePost(req, res) {
    const { updatedFileName } = req.body;

    console.log(updatedFileName);
    await prisma.file.update({
        where: {
            id: Number(req.params.id),
        },
        data: {
            name: updatedFileName
        }
    })

    res.redirect('/');
}

async function fileDeleteGet(req, res) {
    await prisma.file.delete({
        where: {
            id: Number(req.params.id)
        }
    });

    res.redirect('/');
}

async function fileDownloadGet(req, res) {
    const file = await prisma.file.findUnique({
        where: {
            id: Number(req.params.id)
        }
    })

    res.download(file.path, err => {
        if (err) {
            res.status(404).send('File not found');
        }
    });
}

module.exports = {
    fileGet,
    fileUpdateGet,
    fileUpdatePost,
    fileDeleteGet,
    fileDownloadGet,
}