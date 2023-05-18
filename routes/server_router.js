const express = require('express')
const router = express.Router()
const serverDetails = require('../controller/slackAuthScreate.controller')
const user_auth = require('../middleware/user_authication')

router.post('/server_details',serverDetails.SlackInfoRegister)

module.exports = router
