const mongoose = require("mongoose");
const config = require("./keys");

const Connect = async () => {
  try {
    //cloud mongodb connection
    const con = await mongoose.connect(config.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`database connected successfully`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = Connect;
