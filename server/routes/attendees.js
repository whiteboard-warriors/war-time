const express = require('express')
const router = express.Router()

const db = require('../models')

// @route   GET /api/attendees/:eventid
router.get('/:eventid', async (req, res) => {
	try {
		const event = await db.Attendance.find({
			event: req.params.eventid,
		})
		res.json(event)
	} catch (err) {
		console.error(err.message)
		res.status(500).send('Server Error')
	}
})

module.exports = router
