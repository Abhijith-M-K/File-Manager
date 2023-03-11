const User = require("../../models/userModel/userModel");
const File = require("../../models/fileModel/fileModel");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require("../../utils/cloudinary");
// const moment = require('moment');

module.exports.register = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(200)
        .send({ successP: false, message: "User Already Registered" });
    }

    const password = req.body.password;
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashPassword = await bcrypt.hash(password, salt);
    req.body.password = hashPassword;
    const newUser = new User({ ...req.body });
    const result = await newUser.save();

    res
      .status(200)
      .send({ success: true, message: "Registration successfull " });
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const passwordMached = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (passwordMached) {
        const dataForFrontend = {
          _id: user._id,
          email: user.email,
          name: user.name,
        };
        const token = jwt.sign(dataForFrontend, "fileManagement", {
          expiresIn: 3 * 24 * 60 * 60,
        });
        user.password = undefined;
        return res.status(200).send({
          message: "user Login Sucesssfull",
          data: token,
          success: true,
          userData: user,
        });
      } else {
        res
          .status(200)
          .send({ success: false, message: "password not matched" });
      }
    } else {
      res.status(200).send({ message: "user Does Not Exists", success: false });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports.userData = async (req, res) => {
  try {
    const userDetails = await User.findOne({ _id: req.body.userId });

    userDetails.password = undefined;

    res.status(200).send({ success: true, data: userDetails });
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports.uploadFile = async (req, res) => {
  console.log(req.body);
  console.log(req.file, "sdadsasd");
  try {
    console.log("hiiiiiiii");
    const result = await cloudinary.uploader.upload(req.file.path);
    const filedata = new File({
      filename: req.body.filename,
      fileid: result.url,
      userid: req.body.userId,
    });
    await filedata.save();
    res.status(200).send({ message: "file uploaded", success: true });
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports.findFile = async (req, res) => {
  try {
    const findData = await File.find({ userid: req.body.userId });

    if (findData) {
      return res.status(200).send({ success: true, data: findData });
    } else {
      return res
        .status(200)
        .send({ success: false, message: "plase upload file" });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};
module.exports.deleteFile = async (req, res) => {
  const id = req.params.id;
  const userId = req.body.userId;
  console.log(req.body.userId, id, "how are you?");

  try {
    const post = await File.findById(id);
    console.log(post);
    if (post.userid === userId) {
      await post.deleteOne();
      res.status(200).json("Post deleted successfully");
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {
    res.status(400).send(error);
  }
};
