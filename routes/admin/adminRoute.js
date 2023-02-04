const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

// import the model
const Admin = require("../../models/adminModel");
const { sendErrorResponse, sendSuccessResponse } = require("../Utils");
const auth = require("./adminUtils");
const secretKey = process.env.JWT_SECRET_KEY;
// admin sign up
router.post("/signup", async (req, res) => {
  try {
    const isExist = Admin.findOne({ email: req.body.email });
    if (isExist) {
      sendErrorResponse(res, 400, "Email already exists");
      return;
    }
    const newAdmin = new Admin({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    const admin = await newAdmin.save();
    sendSuccessResponse(res, admin, "Admin created successfully");
  } catch (err) {
    sendErrorResponse(res, 500, err.message);
  }
});

// after signin if admin needs to access any specific route
// then he needs to pass the token in the header
// get all admins
router.get("/get-all-admin", auth, async (req, res) => {
  try {
    const admins = await Admin.find();
    sendSuccessResponse(res, admins);
  } catch (err) {
    sendErrorResponse(res, 500, err.message);
  }
});

// admin signin using jwt
router.post("/signin", async (req, res) => {
  try {
    const isAdmin = await Admin.findOne({ email: req.body.email });
    if (!isAdmin) {
      sendErrorResponse(res, 400, "Email not found");
      return;
    }

    if (req.body.password !== isAdmin.password) {
      sendErrorResponse(res, 400, "Invalid email or password.");
      return;
    }
    // Create and assign a JWT
    const token = jwt.sign(
      { _id: isAdmin._id, email: isAdmin.email },
      secretKey,
      {
        expiresIn: "1h",
      }
    );
    res
      .header("auth-token", token)
      .cookie("auth-tok", token) // setting cookie in response headers
      .json({ token, result: true });
  } catch (err) {
    sendErrorResponse(res, 500, err.message);
  }
});

// after signin if admin needs to access any specific route
// then he needs to pass the token in the header

module.exports = router;
