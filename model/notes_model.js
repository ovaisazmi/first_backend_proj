const mongoose=require("mongoose");

const notesSchema=mongoose.Schema({
    "title":String,
    "note":String,
    "category":String,
    "userID":String
})

const notes_model=mongoose.model("notescollection",notesSchema)

module.exports={notes_model}