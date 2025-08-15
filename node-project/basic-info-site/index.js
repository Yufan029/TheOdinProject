import { createServer } from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

createServer((req, res) => {
    console.log('Request URL: ' + req.url);

    let filePath = getFilePath(req.url);
    let contentType = getContentType(req.url);

    console.log('file path: ' + filePath);

    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.log(err);
        }
        
        res.setHeader('Content-type', contentType);
        res.end(data);
    });
}).listen(7529, () => {
    console.log("http://localhost:7529");
});

function getExtensionName(fileName) {
    const extName = path.extname(fileName);
    console.log('ex:' + extName);
    return extName;
}

function getContentType(reqUrl) {
    let contentType = 'text/html';
    switch (getExtensionName(reqUrl)) {
        case '.css':
            contentType = 'text/css';
            break;
        default:
            break;
    }

    return contentType;
}

function getFilePath(reqUrl) {
    let filePath = '';
    switch (reqUrl) {
        case '/':
        case '/index':
            filePath = './index.html';
            break;
        case '/about':
            filePath = './about.html';
            break;
        case '/contact-me':
            filePath = './contact-me.html'
            break;
        case '/styles.css':
            filePath = './styles.css';
            break;
        default:
            filePath = './404.html';
            break;
    }

    return filePath;
}