import express from 'express';
const router = express.Router();
import {authenticateToken, isAdmin} from '../routes/userAuth.js';
import { getAllOrders, getOrderHistory, placeOrder, updateOrderStatus } from '../controller/order.controller.js';

//order-placing
router.post('/placeOrder',authenticateToken,placeOrder);

//order-history
router.get('/getOrderHistory',authenticateToken,getOrderHistory);

//get-all-order  --admin
router.get('/getAllOrders',authenticateToken,isAdmin,getAllOrders);

//update order status --admin
router.put('/updateOrderStatus',authenticateToken,isAdmin,updateOrderStatus);
export default router;