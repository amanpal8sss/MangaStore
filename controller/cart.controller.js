import User from "../models/user.model.js";
//add book to favourites
export const addToCart = async (req,res)=>{
 try {
  const {bookid,id} = req.headers;
  const userData = await User.findById(id);
  const isBookInCart = userData.cart.includes(bookid);
  if(isBookInCart)
    {
      return res.json({
        status:"success",
        message:"Book is Already Added to Cart"
      });

    }
    await User.findByIdAndUpdate(id,{
      $push:{cart:bookid}
    });
    return res.json({
      status:"success",
      message:"Book is Added to Cart"
    });

 } catch (error) {
  return res.status(500).json({
    
    message:error.message
  });
 } 
}

//remove book to cart
export const removeBookFromCart = async(req,res)=>{
  try {
    const {bookid,id} = req.headers;
   
    
        await User.findByIdAndUpdate(id,{$pull:{cart:bookid}});
      
     
      return res.status(200).json({message:"Book Removed from  Cart"});

    
  } catch (error) {
    return res.status(500).json({message:error.message});
    
  }
}
//get cart books for a specific user
export const getCartBooks = async (req,res)=>{
  try {
    const {id } = req.headers;
    const userData = await User.findById(id).populate("cart");//displays objectIds of Cart Bookids
    const cart = userData.cart.reverse();
    return res.status(200).json({status:"success",data:cart});
  } catch (error) {
    return res.status(500).json({message:error.message});
  }
}