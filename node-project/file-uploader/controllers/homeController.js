const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const multer = require('multer');
const path = require('node:path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    secure: true
});

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

const upload = multer({ storage: storage });

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

function uploadGet(req, res) {
    const { parentFolderId, userId } = req.query;
    res.render('upload-file', {
        parentFolderId, 
        userId,
    });
}

function getResourceTypeByFilename(ext) {
  //const ext = path.extname(filename).toLowerCase();

  if ([".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp", ".tiff"].includes(ext)) {
    return "image";
  }

  if ([".mp4", ".avi", ".mov", ".mkv", ".webm"].includes(ext)) {
    return "video";
  }

  // Default everything else to raw (PDF, ZIP, DOCX, etc.)
  return "raw";
}

const uploadImage = async (imagePath) => {
    // Use the uploaded file's name as the asset's public ID and 
    // allow overwriting the asset with new versions

    console.log(path.parse(imagePath).ext.toLowerCase());
    let resourceType = getResourceTypeByFilename(path.parse(imagePath).ext.toLowerCase());
    console.log('resource-type = ', resourceType);

    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
        resource_type: resourceType,
    };

    try {
        // Upload the image
        return await cloudinary.uploader.upload(imagePath, options);
    } catch (error) {
        console.error(error);
    }
};

const uploadPost = [
    upload.single('uploadFile'),
    async (req, res, next) => {
        const result = await uploadImage(req.file.path);

        console.log('upload result:', result);
        const { parentFolderId, userId } = req.query;

        await prisma.file.create({
            data: {
                name: req.file.originalname,
                path: result.secure_url,
                size: req.file.size,
                mimeType: req.file.mimetype,
                publicId: result.public_id,
                resourcetype: result.resource_type,
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
    uploadGet,
    uploadPost,
}