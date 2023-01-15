const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema(
  {
    index: {
      type: Number,
    },
    description: {
      type: String,
    },
    medical_specialty: {
      type: String,
    },
    sample_name: {
      type: String,
    },
    transcription: {
      type: String,
    },
    keywords: {
      type: String,
    },
  },
  {
    collection: "dataset",
  }
);

// your methods must be here before compiling

// compiling Schema to Model
const Records = mongoose.model("Record", recordSchema);
module.exports = Records;
