const express=require("express");
const app=express();
const path=require("path");
const staticPath=path.join(__dirname,"./public");
const port=3000||process.env.port;
app.use(express.static(staticPath));
app.get("/",(req,res)=>{
    res.render("index");
})
app.listen(port,()=>{
console.log("listening");
})