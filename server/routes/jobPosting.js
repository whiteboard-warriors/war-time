const express = require("express");
const router = express.Router();

const db = require("../models");

// @route   GET /api/jobs/postings
// @desc    Retrieves all events
router.get("/", async (req, res) => {
  try {
    const jobPosting = await db.JobPosting.find();
    res.json(jobPosting);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST /api/jobs/postings
// @desc    User creates a job posting
router.post("/", async (req, res) => {
  try {
    let { title, description, attachment } = req.body;
    const jobPosting = new db.JobPosting({
      title,
      description,
    });

    //TODO: Save attachments to Storage Providers
    await jobPosting.save();
    res.sendStatus(200);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT /api/jobs/postings
// @desc    User updates a job posting
router.put("/:id", async (req, res) => {
  try {
    let { title, description, attachment } = req.body;
    let postingId = req.params.id;
    const currentUser = req.user;

    //Check if the current user owns the job posting
    let currentPosting = db.JobPosting.findOne({
      createdBy: currentUser._id,
      _id: postingId,
    });

    if (!currentPosting) {
      return res.sendStatus(401);
    }

    let result = await db.JobPosting.findOneAndUpdate(
      { _id: postingId },
      {
        title: Boolean(title) ? title : currentPosting.title,
        description: Boolean(description) ? description : currentPosting.phone,
        updatedAt: new Date(),
      },
      { new: true }
    );
    result = UserService.getUserPublicDetails(result);
    res.status(200).send(result);
  } catch (e) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE /api/jobs/postings
// @desc    User deletes their job posting
router.delete("/:id", async (req, res) => {
  try {
    let postingId = req.params.id;

    //Check if the current user owns the job posting
    let currentPosting = db.JobPosting.findOne({
      createdBy: currentUser._id,
      _id: postingId,
    });

    if (!currentPosting || !currentUser.admin) {
      return res.sendStatus(401);
    }

    await db.JobPosting.findByIdAndDelete(postingId);

    res.sendStatus(204);
  } catch (e) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
