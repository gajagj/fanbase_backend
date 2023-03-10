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
    sendErrorResponse(res, 500, err.message);
  }
});

// get a single fan
router.get("/:id", getFanDataById, async (req, res) => {
  try {
    sendSuccessResponse(res, res.fan.name);
  } catch (err) {
    sendErrorResponse(res, 500, err.message);
  }
});

// creating a fan
router.post("/create", async (req, res) => {
  try {
    // check whether the fan already exists
    const fanExists = await Fanbase.findOne({ name: req.body.name });
    if (fanExists) {
      sendErrorResponse(res, 400, "Fan already exists");
      return;
    }
    const createFan = new Fanbase({
      name: req.body.name,
      actorName: req.body.actorName,
      age: req.body.age,
    });
    const newFan = await createFan.save();
    sendSuccessResponse(res, newFan, "Fan created successfully");
  } catch (err) {
    sendErrorResponse(res, 500, err.message);
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
    sendErrorResponse(res, 400, err.message);
  }
});

// delete a fan clean code
// router.delete("/:id", (req, res) => {
//   try {
//     Fanbase.findByIdAndDelete({ _id: req.params.id }, (err, fan) => {
//       if (err) {
//         sendErrorResponse(res, 500, err.message);
//       } else {
//         sendSuccessResponse(res, fan, "Fan deleted successfully");
//       }
//     });
//   } catch (err) {
//     sendErrorResponse(res, 500, err.message);
//   }
// });

// delete a fan basic code
router.delete("/:id", getFanDataById, async (req, res) => {
  try {
    await res.fan.remove();
    sendSuccessResponse(res, res.fan, "Fan deleted successfully");
  } catch (err) {
    sendErrorResponse(res, 500, err.message);
  }
});

module.exports = router;

// without the mongoose ORM , we can do the same with native mongodb driver like below
// const express = require('express');
// const router = express.Router();
// const MongoClient = require('mongodb').MongoClient;

// router.get("/", async (req, res) => {
//   try {
//     const client = await MongoClient.connect(mongoUrl, { useNewUrlParser: true });
//     const db = client.db(dbName);
//     const users = await db.collection('users').find().toArray();
//     sendSuccessResponse(res, users, "Users fetched successfully");
//     client.close();
//   } catch (err) {
//     sendErrorResponse(res, 500, err.message);
//   }
// });
