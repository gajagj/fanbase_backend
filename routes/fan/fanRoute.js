const express = require("express");
const router = express.Router();
const Fanbase = require("../../models/fanModel");
const { sendSuccessResponse, sendErrorResponse } = require("../Utils");
const { getFanDataById } = require("./fanUtils");

// get all fans
router.get("/", async (req, res) => {
  try {
    const fans = await Fanbase.find();
    sendSuccessResponse(res, fans);
  } catch (err) {
    sendErrorResponse(res, [], err.message);
  }
});

// get a single fan
router.get("/:id", getFanDataById, async (req, res) => {
  try {
    sendSuccessResponse(res, res.fan.name);
  } catch (err) {
    sendErrorResponse(res, [], err.message);
  }
});

// creating a fan
router.post("/create", async (req, res) => {
  try {
    // check whether the fan already exists
    const fanExists = await Fanbase.findOne({ name: req.body.name });
    if (fanExists) {
      sendErrorResponse(res, [], "Fan already exists");
    }
    const createFan = new Fanbase({
      name: req.body.name,
      actorName: req.body.actorName,
      age: req.body.age,
    });
    const newFan = await createFan.save();
    sendSuccessResponse(res, newFan, "Fan created successfully");
  } catch (err) {
    sendErrorResponse(res, [], err.message);
  }
});

// update patch a fan
router.patch("/:id", getFanDataById, async (req, res) => {
  if (req.body.name != null) {
    res.fan.name = req.body.name;
  }
  if (req.body.actorName != null) {
    res.fan.actorName = req.body.actorName;
  }
  if (req.body.age != null) {
    res.fan.age = req.body.age;
  }
  console.log("res.fan", res.fan);
  try {
    await res.fan.save();
    sendSuccessResponse(res, res.fan, "Fan updated successfully");
  } catch (err) {
    sendErrorResponse(res, [], err.message);
  }
});

// delete a fan clean code
// router.delete("/:id", (req, res) => {
//   try {
//     Fanbase.findByIdAndDelete({ _id: req.params.id }, (err, fan) => {
//       if (err) {
//         sendErrorResponse(res, [], err.message);
//       } else {
//         sendSuccessResponse(res, fan, "Fan deleted successfully");
//       }
//     });
//   } catch (err) {
//     sendErrorResponse(res, [], err.message);
//   }
// });

// delete a fan basic code
router.delete("/:id", getFanDataById, async (req, res) => {
  try {
    await res.fan.remove();
    sendSuccessResponse(res, res.fan, "Fan deleted successfully");
  } catch (err) {
    sendErrorResponse(res, [], err.message);
  }
});

module.exports = router;
