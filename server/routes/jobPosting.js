const express = require("express");
const router = express.Router();

const db = require("../models");
const path = require("path");

const multer = require("multer");

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
    let jobAttachmentHandler = attachmentUploadHandler();
    jobAttachmentHandler(req, res, (err) => {
      let { title, description } = req.body;
      let attachment = req.file;
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        return res.status(400).send(err.message);
      } else if (err) {
        // An unknown error occurred when uploading.
        return res.status(500).send(err);
      }

      //TODO: Save attachment to Storage Providers
      // Get the URL bucket of the attachment and save to db
      const jobPosting = new db.JobPosting({
        title,
        description,
      });
      // await jobPosting.save();
      res.sendStatus(200);
    });
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

/**
 * Return specific handler for job attachment uploads
 */
const attachmentUploadHandler = () => {
  const fileFilter = (req, file, cb) => {
    let filetypes = /txt|pdf|doc|docx/;
    let mimetype = filetypes.test(file.mimetype);
    let extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(
      new Error(
        "File upload only supports the following filetypes - " + filetypes
      )
    );
  };

  const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: fileFilter,
    limits: {
      fields: 5,
      fileSize: 5000000, // 5mb size limit
    },
  }).single("attachment");

  return upload;
};

module.exports = router;
