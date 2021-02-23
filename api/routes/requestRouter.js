const express =require('express')
const pumpController = require('../controllers/pumpController')
const router = express.Router()
router
.route('/')
.get(pumpController.getAllPumps)
.post(pumpController.createPump)
