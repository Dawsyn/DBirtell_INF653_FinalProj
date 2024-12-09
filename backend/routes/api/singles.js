const express = require('express');
const router = express.Router();
const singlesController = require('../../controllers/singlesController');


router.route('/')
    .get(singlesController.getAllCards)
    .post(singlesController.addNewCard)
    .put(singlesController.updateCard) // Update card details

router.route('/:id')
    .get(singlesController.getCard) // Get a single card by ID
    .delete(singlesController.deleteCard) // Delete a card by ID


module.exports = router;
