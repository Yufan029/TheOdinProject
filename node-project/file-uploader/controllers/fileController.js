const { PrismaClient } = require('@prisma/client');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const fetch = require('node-fetch');
const { sign } = require('crypto');

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
    const file = await prisma.file.findUnique({ 
        where: {
            id: Number(req.params.id)
        }
    });

    const result = await cloudinary.uploader.rename(file.publicId, updatedFileName, {
        resource_type: file.resourcetype,
        overwrite: true,
    });

    console.log("Rename result:", result);

    await prisma.file.update({
        where: {
            id: Number(req.params.id),
        },
        data: {
            name: updatedFileName,
            publicId: result.public_id,
            path: result.secure_url,
        }
    });

    res.redirect('/');
}

async function fileDeleteGet(req, res, next) {
    const file = await prisma.file.findUnique({
        where: {
            id: Number(req.params.id)
        }
    });

    console.log('file mimetype:', file.mimeType);
    console.log('resourceType:', file.resourcetype);
    console.log('file.publicId', file.publicId);

    try {
        await cloudinary.uploader.destroy(file.publicId, { resource_type: file.resourcetype });
        await prisma.file.delete({ where: { id: Number(req.params.id) }});
    } catch (error) {
        console.error(error);
        next(error);
    }

    res.redirect('/');
}

async function fileDownloadGet(req, res) {
    const file = await prisma.file.findUnique({
        where: {
            id: Number(req.params.id)
        }
    });

    const filename = path.parse(file.path).base;

    try {
        const response = await fetch(file.path);
        console.log("Cloudinary fetch:", {
            url: file.secure_url,
            status: response.status,
            statusText: response.statusText,
            headers: Object.fromEntries(response.headers)
        });

        if (!response.ok) {
            return res.status(response.status).send('Error fetching file from Cloudinary');
        }

        res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
        res.setHeader("Content-Type", response.headers.get("content-type"));

        // node-fetch@2 gives Node.js readable stream
        response.body.pipe(res);
    } catch (error) {
        console.error(error);
        res.status(500).send("Download failed");
    }

    // This is used for download the local stored file.
    // res.download(file.path, err => {
    //     if (err) {
    //         res.status(404).send('File not found');
    //     }
    // });
}

module.exports = {
    fileGet,
    fileUpdateGet,
    fileUpdatePost,
    fileDeleteGet,
    fileDownloadGet,
}