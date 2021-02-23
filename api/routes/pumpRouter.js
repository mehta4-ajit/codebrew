const express =require('express')
const pumpController = require('../controllers/pumpController')
const router = express.Router()

router
.route('/')
.get(pumpController.getAllPumps)
.post(pumpController.createPump)

router.route('/near-me')
.get(pumpController.getAllPumpsnearme)

router.route('/booking')
.post(pumpController.booking)
.get(pumpController.allbookings)

// router.route('/:id')
// .post(pumpController.pushFilling)
// router
// .route('/:id')
// .get(reviewController.getReview)
// .patch(reviewController.updateReview)
//http://localhost:5000/pumps/near-me?location=72.7738759&location=41.6332863&filling=petrol

module.exports = router