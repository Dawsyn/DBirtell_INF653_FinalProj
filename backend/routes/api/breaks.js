const express = require('express');
const router = express.Router();
const breaksController = require('../../controllers/breaksController');


router.route('/')
    .get(breaksController.getAllBreaks)
    .post(breaksController.addNewBreak)
    .put(breaksController.updateBreak) // Update Break details

router.route('/:id')
    .get(breaksController.getBreak) // Get a Break by ID
    .delete(breaksController.deleteBreaks) // Delete a break by ID


module.exports = router;
