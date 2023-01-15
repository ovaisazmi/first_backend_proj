const express=require("express");
const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const {notes_model}=require("../model/notes_model")

const notes_router=express.Router();


notes_router.get("/all",async(req,res)=>{

    try {
        let allnotes=await notes_model.find();
        res.send(allnotes)
    } catch (error) {
        console.log(error);
        res.send({"Error":error.message})
    }

})


notes_router.post("/create",async(req,res)=>{
    let payload=req.body;
    
    try {
        let newnote=new notes_model(payload);
        await newnote.save();
        res.send(JSON.stringify("Note created"))
    } catch (error) {
        console.log(error);
        res.send(JSON.stringify("Error while creating Note"))
    }

})
 

notes_router.patch("/update/:id",async(req,res)=>{
    let payload=req.body;
    let paramid=req.params.id;
    let doc=await notes_model.findOne({_id:paramid})
    if(doc.userID==payload.userID){
        try {
            let updated=await notes_model.findByIdAndUpdate({_id:paramid},payload)
            res.send(`Note Updated
            => ${updated}`)
        } catch (error) {
            console.log(error);
            res.send({"Error":error.message})
        }
    }else{
        res.send("You do not have athority to change this Doc"+doc)
    }
})


notes_router.delete("/delete/:id",async(req,res)=>{
    let payload=req.body;
    let paramid=req.params.id;
    let doc=await notes_model.findOne({_id:paramid})
    if(doc.userID==payload.userID){
        try {
            let deleted=await notes_model.findByIdAndDelete({_id:paramid})
            res.send(JSON.stringify("Deleted"))
        } catch (error) {
            console.log(error);
            res.send(JSON.stringify({"Error":error.message}))
        }
    }else{
        res.send(JSON.stringify("You do not have athority to change this Doc"+doc))
    }

})


module.exports={notes_router}