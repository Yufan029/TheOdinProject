const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

function folderCreateGet(req, res) {
    console.log(req.query);
    res.render('folder-create', {
        parentFolderId: req.query.parentFolderId
    });
}

async function folderCreatePost(req, res) {
    const folderName = req.body.folderName;
    
    const parentFolderId = req.query.parentFolderId === 'null' ? null : Number(req.query.parentFolderId);

    const folder = await prisma.folder.create({
        data: {
            name: folderName,
            parentFolderId,
            userId: req.user.id,
        }
    });

    req.session.currentFolderId = parentFolderId;
    res.redirect('/');
}

function folderGet(req, res) {
    console.log(req.params.id);
    req.session.currentFolderId = req.params.id ?? null;
    res.redirect('/');
}

async function folderUpdateGet(req, res) {
    const folder = await prisma.folder.findUnique({
        where: {
            id: Number(req.params.id)
        }
    });

    console.log(folder);
    res.render('folder-update', {
        folder
    });
}

async function folderUpdatePost(req, res) {
    const { updatedFolderName } = req.body;

    await prisma.folder.update({
        where: {
            id: Number(req.params.id)
        },
        data: {
            name: updatedFolderName
        }
    });

    res.redirect('/');
}

async function folderDeleteGet(req, res) {
    // only delete the selected folder, leave the children content
    // the next level of folder will attach to the root folder, (home), need manually delete.
    // if needs to delete all sub folders and files, need to implement recursively,
    // check the children and each child's children and delete from the bottom

    await prisma.folder.delete({
        where: {
            id: Number(req.params.id)
        }
    });

    res.redirect("/");
}

module.exports = {
    folderCreateGet,
    folderCreatePost,
    folderGet,
    folderUpdateGet,
    folderUpdatePost,
    folderDeleteGet,
}