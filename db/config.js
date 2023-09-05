// const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize("artschooldb", "admin", "Hero@100", {
//   host: "localhost",
//   dialect: "postgres",
//   logging: false, // Disable logging of SQL queries (optional)
// });

// module.exports = sequelize;

const { default: mongoose } = require("mongoose");
require("dotenv").config();

const dbConnect = () => {
  try {
    const conn = mongoose.connect(process.env.MONGO_DB);
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log("DAtabase error");
  }
};
module.exports = dbConnect;
