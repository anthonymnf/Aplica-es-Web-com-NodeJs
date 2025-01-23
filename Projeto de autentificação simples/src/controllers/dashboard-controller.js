const users = require("../models/users");

module.exports = {
  dashboard: (req, res) => {
    res.render("dashboard", {
      user: { username: req.session.currentUser.username },
    });
  },
  users: (req, res) => {
    res.render("users", { users });
  },
};
