export {}
const express = require('express')
const router = express.Router()
const controller = require('../controller/firstcontroller')

// Style 1 - logic here - no controller
router.route('/').get(function(req, res) {
    res.status(200).send("This is the root route!")
})


router.route('/home').get(function(req, res) {
    res.status(200).send("This is the home route!")
})

// Style 2 - no logic here - controller
router.route('/login').get(controller.loginpage)

module.exports = router