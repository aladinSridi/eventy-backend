const express = require('express');
const router = express.Router();

const event_controller = require('../controllers/event.controller');


router.get('/all', event_controller.event_list);
router.get('/latest', event_controller.event_details_latest);
router.get('/trending', event_controller.event_details_trending);
router.get('/closest/:country', event_controller.event_details_closest);
router.get('/random', event_controller.event_details_random);
router.get('/:id', event_controller.event_details_by_id);
router.post('/create', event_controller.event_create);
router.put('/:id/update', event_controller.event_update);
router.delete('/:id/delete', event_controller.event_delete);

module.exports = router;