const express = require('express');
const router = express.Router();
const boxesController = require('../../controllers/boxesController');


router.route('/')
    .get(boxesController.getAllBoxes)
    .post(boxesController.addNewBox)
    .put(boxesController.updateBox) // Update Box details

router.route('/:id')
    .get(boxesController.getBox) // Get a Box by ID
    .delete(boxesController.deleteBox) // Delete a box by ID


module.exports = router;
