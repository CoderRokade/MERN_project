import { Request, Response, NextFunction } from "express";
import User from "../models/User.js";
import {hash,compare} from "bcrypt";
import { createToken } from "../utiles/token-maneger.js";
import { COOKIE_NAME } from "../utiles/constants.js";

 
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Get all users from the database
  try {
    const users = await User.find();
    return res.status(200).json({ message: "Ok", users }); // Fix: use 'users' instead of 'user'
  } catch (error) {
    console.log(error);
      return res.status(200).json({message:"Error", cause:error.message});
  }
};

export const userSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // user is signing up
  try {
    const { name,email,password } = req.body;
    const existingUser = await User.findOne({ email });
    if(existingUser) return res.status(401).send("User already registered");

    const hashedPassword = await hash(password,10);
    const user = new User({name,email,password: hashedPassword})

    await user.save();
    
    //create token and store cookies
    res.clearCookie(COOKIE_NAME,{domain:"localhost",httpOnly:true,signed:true,path:"/"});

    const token = createToken(user._id.toString(),user.email,"7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME,token,{path:"/",domain:"localhost",expires,httpOnly:true,signed:true});
     
    return res.status(201).json({ message: "Ok", name : user.name,email:user.email}); 
  } catch (error) {
    console.log(error);
      return res.status(200).json({message:"Error", cause:error.message});
  }
};

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
 
  try {
    const { email,password } = req.body;
    const user = await User.findOne({ email });
    if(!user){    //dekh rhe h yaha ki email h ki nhi registered by checking database
      return res.status(401).send("User not registered")
    }
    
    // yaha pe password ko check kr rhe h 
    const isPasswordCorrect = await compare(password,user.password);  //it will return bollean value
    if(!isPasswordCorrect){
        return res.status(403).send("Incorrect Password");
    }

    res.clearCookie(COOKIE_NAME,{domain:"localhost",httpOnly:true,signed:true,path:"/"});

    const token = createToken(user._id.toString(),user.email,"7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME,token,{path:"/",domain:"localhost",expires,httpOnly:true,signed:true});
    
    return res.status(200).json({message: "Ok", name : user.name,email:user.email });

    // return res.status(201).json({ message: "Ok", id:user._id.toString }); 
  } catch (error) {
    console.log(error);
      return res.status(200).json({message:"Error", cause:error.message});
  }
};

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction) => {
 
  try {
    const user = await User.findById( res.locals.jwtData.id );
    if(!user){    //dekh rhe h yaha ki email h ki nhi registered by checking database
      return res.status(401).send("User not registered OR TRoken malfunctioned");
    }
    console.log(user._id.toString(),res.locals.jwtData.id);
    if(user._id.toString() != res.locals.jwtData.id){
       return res.status(401).send("Permission didnt match");
    }
 
    return res.status(200).json({message: "Ok", name : user.name,email:user.email });

    // return res.status(201).json({ message: "Ok", id:user._id.toString }); 
  } catch (error) {
    console.log(error);
      return res.status(200).json({message:"Error", cause:error.message});
  }
};

export const userLogout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    
    //user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }

    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "localhost",
      signed: true,
      path: "/",
    });

    return res
      .status(200)
      .json({ message: "OK", name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};
