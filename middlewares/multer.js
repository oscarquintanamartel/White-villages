const multer = require("multer");

let uploadImage = (folder) => {
  const storage = multer.diskStorage({
    destination: `public/images/${folder}`,
    filename: function (req, file, cb) {
      console.log(file);
      let originalName = file.originalname;
      let extension = originalName.slice(
        originalName.lastIndexOf("."),
        originalName.length
      );
      console.log(extension);
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + "-" + file.originalname);
    },
  });

  const upload = multer({ storage: storage }).single("img");

  return upload;
};

module.exports = uploadImage;
