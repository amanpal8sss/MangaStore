import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";


//add book to favourites
export const addBookFavourite = async(req,res)=>{
  try {
    const {bookid,id} = req.headers;
    const userData = await User.findById(id);
    const isBookFavourite = userData.favourites.includes(bookid);//includes checks if it is already exists in favourites
    if(isBookFavourite)
      {
        return res.status(200).json({message:"Book is already in favourites"});
      }
      await User.findByIdAndUpdate(id,{$push:{favourites:bookid}});
      return res.status(200).json({message:"Book added to  favourites"});

    
  } catch (error) {
    return res.status(500).json({message:error.message});
    
  }
}
//remove book to favourites
export const removeBookFavourite = async(req,res)=>{
  try {
    const {bookid,id} = req.headers;
    const userData = await User.findById(id);
    const isBookFavourite = userData.favourites.includes(bookid);//includes checks if it is already exists in favourites
    if(isBookFavourite)
      {
        await User.findByIdAndUpdate(id,{$pull:{favourites:bookid}});
      }
     
      return res.status(200).json({message:"Book Removed from  favourites"});

    
  } catch (error) {
    return res.status(500).json({message:error.message});
    
  }
}
//get favourite books for a specific user
export const getFavouriteBooks = async (req,res)=>{
  try {
    const {id } = req.headers;
    const userData = await User.findById(id).populate("favourites");//displays objectIds of favourites Bookids
    const favouriteBooks = userData.favourites;
    return res.status(200).json({status:"success",data:favouriteBooks});
  } catch (error) {
    return res.status(500).json({message:error.message});
  }
}