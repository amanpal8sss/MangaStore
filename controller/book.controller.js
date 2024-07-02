import Book from "../models/book.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

//add book controller
export const addBook = async(req,res)=>{
  try {
    

    
    const newBook = new Book({
      url:req.body.url,
      title:req.body.title,
      author:req.body.author,
      price:req.body.price,
      desc:req.body.desc,
      language:req.body.language,
    });
    await newBook.save();
    res.status(200).json({message:"Book Added Successfully!"});
  } catch (error) {
    res.status(500).json({message:error.message});
    
  }
}
// get  allbook details controller
export const getBooks = async(req,res)=>{
  try {
    //limited data is fetched by limit()
    const books = await Book.find().sort({createdAt:-1}).limit(4);
    
return res.status(200).json({status:"Success",
  data:books});  
      
  } catch (error) {
    return res.status(500).json({message:error.message});
    
  }
}

export const getAllBooks = async(req,res)=>{
  try {
    //limited data is fetched by limit()
    const books = await Book.find().sort({createdAt:-1});
    
return res.status(200).json({status:"Success",
  data:books});  
      
  } catch (error) {
    return res.status(500).json({message:error.message});
    
  }
}
//
export const getBook = async(req,res)=>{
  try {
    const {id} =req.params;
    const book = await Book.findById(id);
    
return res.status(200).json({status:"Success",
  data:book});  
      
  } catch (error) {
    return res.status(500).json({message:error.message});
    
  }
}
// update book controller
export const updateBook = async(req,res)=>{
  try {
    const {Bookid} = req.params;
    await Book.findByIdAndUpdate(Bookid,
      req.body
    );
    
    
    res.status(200).json({message:"Book Updated Successfully!"});
  } catch (error) {
    res.status(500).json({message:error.message});
    
  }
}
//Delete book controller
export const deleteBook = async(req,res)=>{
  try {
    const {Bookid} = req.params;
    await Book.findByIdAndDelete(Bookid);
    
    
    res.status(200).json({message:"Book Deleted Successfully!"});
  } catch (error) {
    res.status(500).json({message:error.message});
    
  }
}