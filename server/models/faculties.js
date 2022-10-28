let mongoose = require("mongoose");

// create a model class
let Faculties = mongoose.Schema(
  {
    facultyid: Number,
    facultiesname: String,
    department: String,
    subject: String,
  },
  {
    collection: "faculties",
  }
);

module.exports = mongoose.model("faculties", Faculties);
