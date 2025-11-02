const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Create folder if it doesn't exist
const folderPath = path.join(__dirname, "../uploads");
if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, folderPath),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

// File filter (optional)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) cb(null, true);
  else cb(new Error("Only image files allowed"), false);
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
