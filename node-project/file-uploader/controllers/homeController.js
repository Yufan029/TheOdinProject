const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const multer = require('multer');
const path = require('node:path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../uploads');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath);
        }

        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage })

async function homeGet(req, res) {
    const currentFolderId = req.session.currentFolderId ? Number(req.session.currentFolderId) : null;
    console.log("req.user:", req.user);

    let subFolders = [];
    let subFiles = [];
    if (req.user) {
        subFolders = await prisma.folder.findMany({
            where: {
                AND: [ 
                    { parentFolderId: currentFolderId},
                    { userId: req.user.id}
                ]
            }
        });

        subFiles = await prisma.file.findMany({
            where: {
                AND: [
                    { folderId: currentFolderId },
                    { userId: req.user.id }
                ]
            }
        });
    }
    
    const path = [];
    
    await getCurrentFolderPath(currentFolderId, path);
    console.log("path:", path);

    const currentFolder = {
        id: currentFolderId,
        subFolders,
        subFiles,
        path,
    }

    res.render('home', {
        currentFolder
    });
}

function profileUpload(req, res) {
    console.log("body:", req.body);
    console.log("file:", req.file);
}

function uploadGet(req, res) {
    const { parentFolderId, userId } = req.query;
    res.render('upload-file', {
        parentFolderId, 
        userId,
    });
}

const uploadPost = [
    upload.single('uploadFile'),
    async (req, res, next) => {
        const { parentFolderId, userId } = req.query;

        await prisma.file.create({
            data: {
                name: req.file.originalname,
                path: req.file.path,
                size: req.file.size,
                mimeType: req.file.mimetype,
                folderId: Number(parentFolderId),
                userId: Number(userId),
            }
        });

        res.redirect('/');
    }
]

async function getCurrentFolderPath(currentFolderId, path) {
    if (currentFolderId === null) {
        path.unshift({
            name: "home",
            id: null,
        });

        return;
    }

    const currentFolder = await prisma.folder.findUnique({
        where: {
            id: currentFolderId
        }
    });

    path.unshift({ name: currentFolder.name, id: currentFolder.id });
    await getCurrentFolderPath(currentFolder.parentFolderId, path);
}

module.exports = {
    homeGet,
    profileUpload,
    uploadGet,
    uploadPost,
}