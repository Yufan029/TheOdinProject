const { Router } = require("express");

const indexRouter = Router();

const timeLog = (req, res, next) => {
    const date = new Date(Date.now());
    console.log(`Time: ${date.toDateString()} - ${date.toLocaleTimeString()}`);
    next();
}

indexRouter.use(timeLog);

indexRouter.get('/', (req, res) => res.send("this is index router"));
indexRouter.get('/about', (req, res) => res.send("this is ABOUT page"));
indexRouter.get('/contact', (req, res) => res.send("this is CONTACT page"));
indexRouter.post('/contact', (req, res) => res.send(`Post contact, with ${req.url}`));

module.exports = indexRouter;