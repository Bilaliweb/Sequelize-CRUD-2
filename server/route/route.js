const express = require('express')
const router = express.Router()
const userCRUD = require('../controller/controller')
const checkUrl = require('../middleware/middleware')
// const save = require('../middleware/post-middleware')
const postCheck = require('../middleware/post-middleware')

// router.use('/user', router)

/////////// CRUD End points ////////////

//////// Get All Users
router.get('/getuser', checkUrl, userCRUD.findAllUsers)

//////// Get User by Id
router.get('/getuser/:id', checkUrl, userCRUD.findUserById)

/////// Get User by Name
router.get('/searchuser', checkUrl, userCRUD.findUsersByName)

/////// Get specific user by name
router.get('/oneuser', checkUrl, userCRUD.findOneUserByName)

//////// Create User
router.post('/createuser', checkUrl, postCheck, userCRUD.createNewUser)

//////// Update User
router.put('/updateuser/:id', checkUrl, postCheck, userCRUD.updateUserById)

//////// Delete User
router.delete('/deleteuser/:id', checkUrl, userCRUD.deleteUserById)

module.exports = router