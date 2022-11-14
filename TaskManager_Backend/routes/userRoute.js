const express = require('express');
const router = express.Router();


import userController from "../controllers/userController.js";
import checkUserAuth from "../middlewares/authMiddleware.js";
// Route Level Middleware - To Protect Route
router.use('/changepassword' , checkUserAuth);
router.use('/loggeduser' , checkUserAuth);
// Public Routes
router.post('/register' , userController.userRegistration);
router.post('/login' , userController.userLogin);

export default router;