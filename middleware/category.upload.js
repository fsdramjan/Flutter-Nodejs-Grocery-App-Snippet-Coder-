const multer = require("multer");
const Path = require("path");


const storage = multer.diskStorage({
                  destination: function (req, file, callback) {
                                    callback(null, "./uploads/categories");



                  },
                  filename: function (req, file, callback) {
                                    callback(null, Date.now() + "-" + file.originalname);
                  }


});

const fileFilter = (req, file, callback) => {
                  const acceptableExt = [".png", ".jpg", ".jpeg"];
                  if (!acceptableExt.includes(Path.extname(file.originalname))) {


                                    return callback(new Error("Only .png, .jpg and .jpeg format allowed!"));

                  }

                  const fileSize = parseInt(req.headers["content-length"]);

                  if (fileSize > 1048576) {
                                    return callback(new Error("File Size Big"));
                                    
                  }

                  callback(null, true);
};

var upload = multer({
                  storage: storage,
                  fileFilter: fileFilter,
                  fileSize: 1048576,
});

module.exports = upload.single("categoryImage");
 