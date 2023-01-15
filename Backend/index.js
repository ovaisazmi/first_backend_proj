const express=require("express");
const cors=require("cors")
const { connection } = require("./config/db");
require("dotenv").config();
const {router}=require("./routes/user_route")
const {notes_router}=require("./routes/notes_route")
const {authentication}=require("./Middleware/authontication")

const app=express();
app.use(express.json());
app.use(cors())

app.use("/user",router);


app.use(authentication)

app.use("/notes",notes_router)

app.get("/",(req,res)=>{
    res.send("Home page")
})



app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("Connected to DB");
    } catch (error) {
    console.log({"Error":error.message})
    }
    console.log("Server is running at "+process.env.port);
}) 