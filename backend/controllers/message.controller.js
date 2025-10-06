import { generateResponse } from "../lib/gemini.js";
import Message from "../models/message.model.js";

export const getAllMessages=async(req,res,next)=>{
    try {
        const userId=req.user._id;
        const messages=await Message.find({userId});

        res.status(200).json({
            success:true,
            message:"Messages fetched",
            data:{
                messages
            }
        })
    } catch (error) {
        next(error)
    }
};

export const createChat=async(req,res,next)=>{
    try {
        const userId=req.user._id;
        const message=await Message.create({
            userId,
            responses:[]
        })
        res.status(201).json({
            success:true,
            message:"Chat Created Successfully",
            data:{
                message
            }
        });
    } catch (error) {
        next(error)
    }
}

export const sendPrompt=async(req,res,next)=>{
    const {prompt}=req.body;
    try {
        const id=req.params.id;
        const userId=req.user._id
        const response=await generateResponse(prompt)
        const responseText=response.response.text();

        let message=await Message.findById({_id:id});

        if(!message){
            message=await Message.create({
                userId,
                responses:[prompt,response=responseText]
            })
        }else{
            message.responses.push({prompt,response:responseText});
        }
        await message.save();

        res.status(201).json({
            success:true,
            message:"Response generated",
            data:{
                message
            }
        })
    } catch (error) {
        next(error)
    }
};

export const sendBupPrompt=async(req,res,next)=>{
    const {prompt}=req.body;
    try {
        const response=await generateResponse(prompt)
        const responseText=response.response.text();

        res.status(200).json({
            success:true,
            message:"Response generated",
            data:{
                response:responseText
            }
        })
    } catch (error) {
        next(error)
    }
};