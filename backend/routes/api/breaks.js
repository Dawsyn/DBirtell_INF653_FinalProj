const express = require('express');
const router = express.Router();
const breaksController = require('../../controllers/breaksController');


router.route('/')
    .get(breaksController.getAllBreaks) // Returns all breaks
    .post(breaksController.addNewBreak) // Creates a new break document
    .put(breaksController.updateBreak) // Update Break details

router.route('/:id')
    .get(breaksController.getBreak) // Get a Break by ID
    .delete(breaksController.deleteBreaks) // Delete a break by ID


module.exports = router;
