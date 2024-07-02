import User from '../models/user.model.js';
import Book from '../models/book.model.js';
import Order from '../models/order.model.js';
import { populate } from 'dotenv';

export const placeOrder = async (req,res)=>{
  try {
    const {id} = req.headers;
    const {order} = req.body;
    for(const i of order)
      {
        const newOrder = new Order({user:id,book:i._id});
        const orderDataFromDb = await newOrder.save();
        //saving order in user model
        await User.findByIdAndUpdate(id,{
          $push:{orders:orderDataFromDb._id},
        });
        //clearing the cart since the order is placed
        await User.findByIdAndUpdate(id,{$pull:{cart:i._id},
        });

      }
      return res.json({
        status:"success",
        message:"Order Placed Successfully",
      });

  } catch (error) {
    return res.status(500).json({
      message:error.message,
    });

  }
}

export const getOrderHistory = async (req,res)=>{
  try {
    const {id}= req.headers;
    const userData = await User.findById(id).populate({
      //populating the order
      path:"orders",
      //populating the book of which the order is
      populate:{path:'book'},
    });

    const ordersData = userData.orders.reverse();
    return res.json({
      status:"success",
      data:ordersData,
    });

    
  } catch (error) {
    return res.status(500).json({
      message:error.message,
    });
  }
}

export const getAllOrders = async(req,res)=>{
  try {
  const userData = await Order.find().populate({
    path:"book",
  }).populate({path:"user"}).sort({createdAt:-1});
  return res.json({
    status:"success",
    data:userData,
  });
}

 catch (error) {
  return res.status(500).json({
    message:error.message,
  });
}
}

export const updateOrderStatus = async(req,res)=>{
  try {
    const {id} = req.params;
  await Order.findByIdAndUpdate(id,{status:req.body.status});
  return res.json({
    status:"success",
    message:"Status Updated Successfully",
  });

}

 catch (error) {
  return res.status(500).json({
    message:error.message,
  });
}
}