import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";


//sign-up controller
export const signup = async (req, res) => {
  try {
    const { username, email, password, address } = req.body;
    //username length >5
    if (username.length < 5) {
      return res
        .status(400)
        .json({ message: "USername length should be greater than 5" });
    }
    //username already exits
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      return res.status(400).json({ message: "USername already Exits!" });
    }

    //email alreay exits
    //username already exits
    const existingEmail = await User.findOne({ email: email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already Exits!" });
    }

    //password length >5
    if (password.length <= 5) {
      return res
        .status(400)
        .json({ message: "password length should be greater than 5" });
    }
    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
      address: address,
    });
    await newUser.save();
    return res.status(200).json({ message: "Sign-up Successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//sign-in controller
export const signin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUserName = await User.findOne({ username });
    if (!existingUserName) {
      res.status(400).json({ message: "Invalid credentials!" });
    }
    await bcryptjs.compare(password, existingUserName.password, (err, data) => {
      if (data) {
        const authClaims = [
          { name: existingUserName.username },
          { role: existingUserName.role },
        ];
        const token = jwt.sign({ authClaims }, process.env.SECRET_KEY, {
          expiresIn: "30d",
        });
        res.status(200).json({ id:existingUserName._id,role:existingUserName.role,token:token });
      } if(err) {
        res.status(400).json({ message: "Invalid credentials!" });
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//get user information
export const getUser = async (req,res)=>{
  try {
    const { id } = req.headers;    
    const data = await User.findById(id).select('-password');
    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update address
export const updateAddress = async (req,res)=>{
  try {
    const {id}=req.headers;
    const {address} = req.body;
    await User.findByIdAndUpdate(id,{address:address});
    return res.status(200).json({message:"Address Updated Successfully!"});
  } catch (error) {
    res.status(500).json({ message: error.message }); 
  }
}