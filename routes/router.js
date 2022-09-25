const router = require("express").Router();
const fs = require("fs");
const store = require("./multer");
const uploadModel = require("../model/schema");

//route innit
router.get("/", (req, res) => {
  res.render("index");
});

router.post("/uploadmultiple", store.array("images", 12), (req, res, next) => {
  const files = req.files;
  if (!files) {
    const error = new Error("please choose image");
    error.httpStatusCode = 400;
    return next(error);
  }

  //convert images into base64 encoding
  const imgArray = files.map((files) => {
    const img = fs.readFileSync(files.path);
    return (encode_image = img.toString("base64"));
  });

  const result = imgArray.map(async (src, index) => {
    //create object to store data in the collection
    const finalImg = {
      file: files[index].originalName,
      contentType: files[index].mimeType,
      imageBase64: src,
    };

    let newUpload = new uploadModel(finalImg);
    return newUpload
      .save()
      .then(() => {
        return { msg: `${files[index].originalName} uploaded successfully` };
      })
      .catch((error) => {
        if (error) {
          if (error.name === "MongoError" && error.code === 11000) {
            return Promise.reject({
              error: `duplicate ${files[index].originalName}.File already exist`,
            });
            return Promise.reject({
              error:
                error.message ||
                `Cannot upload ${files[index].originalName} Something Missing`,
            });
          }
        }
      });
  });
  Promise.all(result)
    .then((msg) => {
      res.json(msg);
      console.log(msg);
      // res.redirect("/");
    })
    .catch((err) => {
      res.json(err);
    });
});
module.exports = router;
