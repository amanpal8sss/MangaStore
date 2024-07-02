
import express from 'express';
import Book from "../models/book.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import {addBook,getBook,getBooks,updateBook,deleteBook, getAllBooks} from '../controller/book.controller.js';
import {authenticateToken,isAdmin} from '../routes/userAuth.js'
const router = express.Router();

//add-book --admin
router.post('/addBook',authenticateToken,isAdmin,addBook);

//get-book --admin
router.get('/getBook/:id',getBook);

//get-books --(admin)
router.get('/getBooks',getBooks);

//get-books (--admin)
router.get('/getallBooks',getAllBooks);



//update-book --admin
router.put('/updateBook/:Bookid',authenticateToken,isAdmin,updateBook);

//delete-book --admin
router.delete('/deleteBook/:Bookid',authenticateToken,deleteBook);



export default router;