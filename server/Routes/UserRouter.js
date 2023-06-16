const express = require('express');
const userRouter= express.Router();
const authMiddleware= require('../middleware/authmiddleware')

const {
    registerController,
    LoginController,
    CurrentUserController
} =require('../controllers/UserController')

userRouter.post('/register',registerController)
userRouter.post('/login',LoginController )
userRouter.get('/currentUser',authMiddleware,CurrentUserController)

module.exports = userRouter;