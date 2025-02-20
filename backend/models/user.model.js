import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:[true,"First Name is required"],
        trim:true,
        min:3,
        max:20
    },
    lastName:{
        type:String,
        required:[true,"Last Name is required"],
        trim:true,
        min:3,
        max:20
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        trim:true,
        unique:true,
        lowercase:true,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Please fill a valid email address"]
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        min:6,
    }
});

const User=mongoose.model("User",userSchema);
export default User;