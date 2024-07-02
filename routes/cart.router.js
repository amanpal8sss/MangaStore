import express from 'express';
const router = express.Router();
import {authenticateToken} from '../routes/userAuth.js';
import { addToCart, getCartBooks, removeBookFromCart } from '../controller/cart.controller.js';



//add-book to cart
router.put('/addToCart',authenticateToken,addToCart);
//remmove-book from cart
router.put('/removeFromCart',authenticateToken,removeBookFromCart);
//get-cart-books details
router.get('/getCartBooks',authenticateToken,getCartBooks);

export default router;