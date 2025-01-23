const express = require("express");
const authMiddleware = require("../middlewares/auth-middleware");
const adminController = require("../controllers/admin-controller");

const adminRouter = express.Router();

adminRouter.put("/add", authMiddleware, adminController.addAdmin);
adminRouter.get("/users", authMiddleware, adminController.readAllUsers);
adminRouter.delete("/delete", authMiddleware, adminController.deleteUser);

module.exports = adminRouter;
