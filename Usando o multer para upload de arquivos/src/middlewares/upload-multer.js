const multer = require("multer");

const uploadMulter = multer({
  dest: "uploads/",
});

module.exports = uploadMulter;
