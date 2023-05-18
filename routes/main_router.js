const express = require('express')
const router = express.Router()
const user_router = require('./user_router')
const server_router = require('./server_router')

router.use('/user',user_router)
router.use('/server',server_router)

console.log("===>main router");

module.exports = router
