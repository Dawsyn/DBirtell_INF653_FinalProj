const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/usersController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(usersController.getAllUsers)  //Returns all users
    .delete(verifyRoles(ROLES_LIST.Admin), usersController.deleteUser); // Deletes users by ID

router.route('/:id')
    .get(verifyRoles(ROLES_LIST.Admin), usersController.getUser); // Returns user by ID


module.exports = router;