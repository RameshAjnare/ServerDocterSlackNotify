const express = require('express')
const router = express.Router()
const userController = require('../controller/userdata.controller')
const userValidation = require('../validation/userValidation')
const userProject = require('../controller/projectinfo.controller')



router.post('/create_user',userController.createUser)
router.post('/login_user',userValidation.userLogin,userController.loginUser)

router.post('/user_project',userProject.projectDetails)
router.post('/domain_name',userProject.domainName)


module.exports = router