const express = require('express');
const router = express.Router();

const event_controller = require('../controllers/event.controller');


var fs = require('fs');
const multer = require("multer");


// SET STORAGE
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        let a = file.originalname.split('.')
        cb(null, `${file.fieldname}-${Date.now()}.${a[a.length-1]}`)
    }
})

const upload = multer({ storage: storage })
//---------------------------------------------------------

router.get('/all', event_controller.event_list);
router.get('/latest', event_controller.event_details_latest);
router.get('/trending', event_controller.event_details_trending);
router.get('/closest/:country', event_controller.event_details_closest);
router.get('/random', event_controller.event_details_random);
router.get('/:id', event_controller.event_details_by_id);
router.post('/create',upload.single('image'), event_controller.event_create);
router.put('/:id/update', event_controller.event_update);
router.delete('/:id/delete', event_controller.event_delete);

module.exports = router;