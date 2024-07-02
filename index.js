import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
const app = express();
dotenv.config();
import  conn  from './conn/db.js';
import userRoute from './routes/user.routes.js';
import bookRoute from './routes/book.route.js';
import favRoute from './routes/favourite.router.js';
import cartRoute from './routes/cart.router.js';
import orderRoute from './routes/order.route.js';
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());
app.use(cors());
app.get('/',(req,res)=>{
  res.send('Hello Mongoose');
})
//routes
app.use('/api/v1/',userRoute);
app.use('/ap1/v1/',bookRoute);
app.use('/ap1/v1/',favRoute);
app.use('/ap1/v1/',cartRoute);
app.use('/ap1/v1/',orderRoute);

app.listen(PORT,()=>{
  console.log(`Server Started At ${PORT}`);
})

