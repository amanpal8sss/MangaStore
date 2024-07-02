import express from 'express';
import {signup,signin,getUser,updateAddress} from '../controller/user.controller.js';
import {authenticateToken} from '../routes/userAuth.js'
const router = express.Router();

//sign-up
router.post('/signup',signup);

//sign-in
router.post('/signin',signin);

//get-userr-info
router.get('/user',authenticateToken,getUser);

//Update-Address
router.put('/update',authenticateToken,updateAddress)


export default router;