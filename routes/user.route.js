const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/user.controller');


router.get('/all', user_controller.user_list);
router.get('/id/:id', user_controller.user_details_by_id);
router.get('/username/:username', user_controller.user_details_by_username);
router.get('/membership/:username/:password', user_controller.user_details_by_username_and_password);
router.post('/create', user_controller.user_create);
router.put('/:id/update', user_controller.user_update);
router.delete('/:id/delete', user_controller.user_delete);

module.exports = router;