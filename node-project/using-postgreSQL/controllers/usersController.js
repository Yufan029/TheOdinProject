const db = require("../db/queries");

exports.listUsersGet = async (req, res) => {
    const usernames = await db.getAllUsernames();
    console.log("Usernames: ", usernames);
    res.render("users", {
        title: "All Users",
        users: usernames,
    });
};

exports.newUserGet = (req, res) => {
    res.render("newUser", {
        title: "Add New User",
    });
};

exports.newUserPost = async (req, res) => {
    const { username } = req.body;
    await db.insertUsername(username);

    res.redirect("/");
}

exports.searchUsers = async (req, res) => {
    const { searchValue } = req.query;
    const users = await db.getUsersBySearchValue(searchValue);

    const title = searchValue ? `Search ${searchValue}` : "All Users";

    res.render("users", {
        title,
        users,
        searchValue,
    })
}

exports.deleteAllUsers = async (req, res) => {
    db.deleteAllUsers();
    res.redirect("/");
}