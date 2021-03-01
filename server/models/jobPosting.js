const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);

const Schema = mongoose.Schema;

const JobPostingSchema = new Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  attachment: {
    type: String, // URL to retrieve user attachments (resume, etc)
  },
});

const JobPosting = mongoose.model("JobPosting", JobPostingSchema);

module.exports = JobPosting;
