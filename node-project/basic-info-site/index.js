import { createServer } from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import express from 'express';
import  { fileURLToPath } from 'url';

const app = express();

console.log('-----------------------------');
console.log(`file URL: ${import.meta.url}`);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(`file name: ${__filename}`);
console.log(`dir name: ${__dirname}`);
console.log('-----------------------------');

const indexFilePath = path.join(__dirname, 'index.html');
console.log(indexFilePath);

// Using the absolute file path.
app.get('/', (req, res) => res.sendFile(indexFilePath));
app.get('/index', (req, res) => res.sendFile(indexFilePath));

// Adding the root flag to indicate the root directory.
app.get('/about', (req, res) => res.sendFile('about.html', { root: '.' }));
app.get('/contact-me', (req, res) => res.sendFile('contact-me.html', { root: '.' }));
app.get('/styles.css', (req, res) =>  res.sendFile('styles.css', { root: '.' }));
app.use((req, res) => res.status(404).sendFile('404.html', { root: '.'}));

const PORT = 7529;
app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }

    console.log("Please check http://localhost:7529");
})

// ******************************************************
// Below is the vanilla node implementation of the route
// ******************************************************
// createServer((req, res) => {
//     console.log('Request URL: ' + req.url);

//     let filePath = getFilePath(req.url);
//     let contentType = getContentType(req.url);

//     console.log('file path: ' + filePath);

//     fs.readFile(filePath, (err, data) => {
//         if (err) {
//             console.log(err);
//         }
        
//         res.setHeader('Content-type', contentType);
//         res.end(data);
//     });
// }).listen(7529, () => {
//     console.log("http://localhost:7529");
// });

// function getExtensionName(fileName) {
//     const extName = path.extname(fileName);
//     console.log('ex:' + extName);
//     return extName;
// }

// function getContentType(reqUrl) {
//     let contentType = 'text/html';
//     switch (getExtensionName(reqUrl)) {
//         case '.css':
//             contentType = 'text/css';
//             break;
//         default:
//             break;
//     }

//     return contentType;
// }

// function getFilePath(reqUrl) {
//     let filePath = '';
//     switch (reqUrl) {
//         case '/':
//         case '/index':
//             filePath = './index.html';
//             break;
//         case '/about':
//             filePath = './about.html';
//             break;
//         case '/contact-me':
//             filePath = './contact-me.html'
//             break;
//         case '/styles.css':
//             filePath = './styles.css';
//             break;
//         default:
//             filePath = './404.html';
//             break;
//     }

//     return filePath;
// }