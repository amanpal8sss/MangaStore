import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
export const authenticateToken = (req,res,next)=>{
  try {
    const decode = jwt.verify(
      req.headers.authorization,
      process.env.SECRET_KEY
    );
    req.user = decode;
    next();
  } catch (error) {
    return res.status(404).send({
      success: false,
      message: "Error in Signin",
      error,
    });
  }
};

 export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.headers.id);
    if (user.role !== "admin") {
      return res
        .status(401)
        .send({ success: false, message: "Unauthorized Access" });
    } else {
      next();
    }
  } catch (error) {
    return res.status(404).send({
      success: false,
      message: "Error in Signin",
      error,
    });
  }
};

//export default {authenticateToken,isAdmin};