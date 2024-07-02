import express from 'express';
const router = express.Router();
import {authenticateToken} from '../routes/userAuth.js';
import {addBookFavourite,removeBookFavourite,getFavouriteBooks} from '../controller/favourite.controller.js';

//add-book to favourite
router.put('/addBookFavourite',authenticateToken,addBookFavourite);
//get-book from favourite
router.get('/getBookFavourite',authenticateToken,getFavouriteBooks);
//remove-book from favourite
router.put('/removeBookFavourite',authenticateToken,removeBookFavourite);



export default router;