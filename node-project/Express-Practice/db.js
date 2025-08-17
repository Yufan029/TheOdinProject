const path = require('node:path');

const authors = [
    { id: 1, name: 'Bryan' },
    { id: 2, name: 'Christian' },
    { id: 3, name: 'Jason' },
];

async function getAuthorById(authorId) {
    return authors.find(author => author.id === authorId);
};

const links = [
    { href: "/", text: "Home" },
    { href: "about", text: "About" },
    { href: "articles", text: "Articles" },
];

const users = ["Rose", "Cake", "Biff"];
const assetsPath = path.join(__dirname, "public");
const articles = [
    {id: 1, title: 'Lorem ipsum dolor sit amet', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'},
    {id: 2, title: 'Nam blandit pretium neque', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'},
    {id: 3, title: 'Phasellus auctor convallis purus', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
];

module.exports = { getAuthorById, links, users, assetsPath, articles };