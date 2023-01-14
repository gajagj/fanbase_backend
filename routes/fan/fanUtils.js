const Fanbase = require("../../models/fanModel");

const getFanDataById = async (req, res, next) => {
  let fan;
  console.log("cannot find fan1", fan, req.params.id);

  try {
    fan = await Fanbase.findById({ _id: req.params.id });
    console.log("cannot find fan2", fan);
    if (fan === null) {
      console.log("cannot find fan3", fan);
      return res.status(404).json({ message: "cannot find fan" });
    }
  } catch (err) {
    console.log("cannot find fan4", fan);

    return res.status(500).json({ message: err.message });
  }
  res.fan = fan;
  next();
};

module.exports = { getFanDataById };
