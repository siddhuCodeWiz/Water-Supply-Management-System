// import express from "express";
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt';
// import { UserModel } from "../models/Users.js";

// const router =express.Router();

// router.post("/register",async(req,res)=>{
//     const {username, password} = req.body;
//     console.log(req.body);
//     const user = await UserModel.findOne({username});
//     if(user){
//         return res.json({ message:"User already exists!"});
//     }
//     const hashedPassword = await bcrypt.hash(password,10)
//     const newUser = new UserModel({ username ,password :hashedPassword});
//     await newUser.save();
//     res.json({message:"User registerd successfully"});
// });

// router.post("/login",async(req,res)=>{
//     const {username,password}=req.body;
//     const user = await UserModel.findOne({username});
//     if(!user){
//         return res.json({message:"User Doesn't Exists"})
//     }
//     const isPasswordValid = await bcrypt.compare(password,user.password);
//     if(!isPasswordValid){
//         return res.json({message:"Username or Password Is Incorrect" });
//     }
//     const token=jwt.sign({id:user._id},"secret");
//     res.json({token,userID:user._id})
// });
// export {router as UserRouter}




// import express from "express";
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt';
// import { UserModel } from "../models/Users.js";

// const router =express.Router();

// router.post("/register",async(req,res)=>{
//     const {username, password} = req.body;
//     const user = await UserModel.findOne({username});
//     if(user){
//         return res.json({ message:"User already exists!"});
//     }
//     const hashedPassword = await bcrypt.hash(password,10)
//     const newUser = new UserModel({ username ,password :hashedPassword});
//     await newUser.save();
//     res.json({message:"User registerd successfully"});
// });

// router.post("/login",async(req,res)=>{
//     const {username,password}=req.body;
//     const user = await UserModel.findOne({username});
//     if(!user){
//         return res.json({message:"User Doesn't Exists"})
//     }
//     const isPasswordValid = await bcrypt.compare(password,user.password);
//     if(!isPasswordValid){
//         return res.json({message:"Username or Password Is Incorrect" });
//     }
//     const token=jwt.sign({id:user._id},"secret");
//     res.json({token,userID:user._id})
// });
// export {router as UserRouter}


import express from "express";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from "../models/Users.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password, role } = req.body; 
  const user = await UserModel.findOne({ username });

  if (user) {
    return res.json({ message: "User already exists!" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new UserModel({ username, password: hashedPassword, role });

  try {
    await newUser.save();
    res.json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
 
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });
  if (!user) {
    return res.json({ message: "User doesn't exist" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.json({ message: "Username or Password is incorrect" });
  }

  const token = jwt.sign({ id: user._id, role: user.role }, "secret");
  res.json({ token, userID: user._id, role: user.role });
});

export { router as UserRouter };