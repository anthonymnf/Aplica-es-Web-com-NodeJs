const authMiddleware = (req, res, next) => {
  if (!req.session.authenticated) {
    return res.status(401).redirect("/");
  }
  next();
};

const ensureUserIsAdmin = (req, res, next) => {
  if (req.session.currentUser.role !== "admin") {
    return res.status(401).redirect("/dashboard");
  }
  next();
};

module.exports = { authMiddleware, ensureUserIsAdmin };
