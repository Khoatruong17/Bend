const uploadFile = require("../services/uploadService");
const mime = require("mime-types");
const path = require("path");

let allowedMimeTypes = ["image/jpeg", "image/png"];

const postUploadSingleFile = async (req, res) => {
  if (!req.files || Object.keys(req.files.file).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }
  let mimeType = mime.lookup(req.files.file.name);

  if (!allowedMimeTypes.includes(mimeType)) {
    throw new Error(
      "Only image, Word, and PDF files are allowed. Please check your file(s) (single)."
    );
  }
  let result = await uploadFile.uploadSingleFile(req.files.file);
  console.log(result);
  return result;
  //   return res.status(200).json({
  //     EC: "ok",
  //   });
};

const postUploadMultipleFiles = async (req, res) => {
  console.log(req.files);

  // Check if files are provided and they are not empty
  if (!req.files || Object.keys(req.files.file).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }
  if (Array.isArray(req.files.file)) {
    for (const file of req.files.file) {
      let mimeType = mime.lookup(file.name);
      if (!allowedMimeTypes.includes(mimeType)) {
        throw new Error(
          "Only image, Word, and PDF files are allowed. Please check your file(s) (multiple)."
        );
      }
    }
    let result = await uploadFile.uploadMultipleFiles(req.files.file);
    return result;
  } else {
    return await postUploadSingleFile(req, res);
  }
};

const uploadImage = async (req, res) => {
  console.log(req.files);
  if (
    !req.files ||
    !req.files.image ||
    Object.keys(req.files.image).length === 0
  ) {
    return res.status(400).send("No files were uploaded.");
  }

  const image = req.files.image;

  // Check if the file is an image
  const allowedImageTypes = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
  if (!allowedImageTypes.test(path.extname(image.name))) {
    return res.status(400).json({
      EM: "Only image files are allowed (JPEG, JPG, PNG, GIF)",
      EC: 1,
    });
  }

  try {
    let result = await uploadFile.uploadImageUser(image);
    return res.status(200).json(result);
  } catch (error) {
    console.log("Error uploading image:", error);
    return res.status(500).json({
      EM: "An error occurred while uploading the image",
      EC: 1,
    });
  }
};

module.exports = {
  postUploadSingleFile,
  postUploadMultipleFiles,
  uploadImage,
};
