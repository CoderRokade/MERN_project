import mongoose, { Schema } from "mongoose";
import {UUID, randomUUID} from "crypto"

const chatSchema = new mongoose.Schema(
    {
        id:{
           type:String,
           default:randomUUID,
        },
        role:{
            type: String,
            required:true,
        },
        content:{
            type:String,
            required:true,
        },

    }
);
const userSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required:true,
        },
        email:{
            type: String,
            required: true,
            unique:true,
        },
        password:{
            type: String,
            required:true,
        },
        chats:[chatSchema],
    
    }
);

export default mongoose.model("User",userSchema)



// mai chahta hu ki har ek user ka name ,email, chat aur passwordho aur in sab ko store karna padge 
// hame dtabase me taki jab bhi user aaye to in fields ka use krke vo apna account create kr sake
// that is why m user schma me ye sare fields dL RHA HU HERE WE ARE USING TS THAT IS WHY I NEED TO DECLARE 
// THE DATATYPE AND FIELD 