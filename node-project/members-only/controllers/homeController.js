const db = require('../db/queries');
const svgCaptcha = require('svg-captcha');

function homeGet(req, res) {
    res.render('home', {
        title: "Member Messages",
    });
}

function joinClubGet(req, res) {
    res.render('join-club', {
        title: "Join Club"
    })
}

function captchaGet(req, res) {
    const captcha = svgCaptcha.create({
        noise: 3,
        color: true,
        backgournd: '#ccf',
    });

    req.session.captcha = captcha.text;
    res.type('svg');
    res.status(200).send(captcha.data);
}

async function verifyCaptchPost(req, res) {
    if (req.body.captcha === req.session.captcha) {
        await db.addUserToClubById(res.locals.currentUser.id);
        res.redirect("/");
    } else {
        res.send("Please try again");
    }
}

module.exports = {
    homeGet,
    joinClubGet,
    captchaGet,
    verifyCaptchPost,
}