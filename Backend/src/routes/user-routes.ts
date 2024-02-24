import { Router } from "express";
import { getAllUsers, userLogin, userSignup, verifyUser,userLogout } from "../controllers/user-controllers.js";
import {validate,signupValidators,loginValidator} from "../utiles/validators.js"
import { varifyToken } from "../utiles/token-maneger.js";


const userRoutes = Router();

userRoutes.get("/", getAllUsers);

userRoutes.post("/signup",validate(signupValidators) ,userSignup);

userRoutes.post("/login",validate(loginValidator) ,userLogin);

userRoutes.get("/auth-status", varifyToken,verifyUser);

userRoutes.get("/logout", varifyToken, userLogout);

export default userRoutes; 