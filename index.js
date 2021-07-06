const express = require("express");
const path = require ("path");
const app = express();
const port = process.env.PORT || 3000 ;
// app.use(express.json());


app.use(express.urlencoded({extended:false}));

// connection for the databse

const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://vaibhav:vabs4721@cluster0.ap0fj.mongodb.net/login&logout?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log("connection succesfull");
}).catch((e)=>{
    console.log("no connection");
})


// creating schema for database

const ContactSchema = new mongoose.Schema({
    fname: String,
    lname:String
  });


  const ContactEmpSchema = new mongoose.model("ContactEmpSchema",ContactSchema)



app.set("view engine","hbs");

app.get("/",(req,res)=>{
    res.render("register")
})

app.get("/login",(req,res)=>{
    res.render("login")
})

app.get("/index",(req,res)=>{
    res.render("index")
})




app.post("/register",async(req,res)=>{
    try{
        const addingContat =new ContactEmpSchema(req.body)
        console.log(req.body);
        const addCon = await  addingContat.save();
        res.status(201).send(addCon);
    }catch(e){
        res.status(400).send(e)
    }
})




app.post("/login", async(req,res)=>{
try{

    
const email=req.body.fname;
const password=req.body.lname;


// console.log(`name is ${name} and the password is ${password}`)


const user_email= await ContactEmpSchema.findOne({fname:email});


if(user_email.lname===password){
    res.status(201).render("index");
}else{
    res.send("password are not matching")
}

// res.send(useremail)
// console.log(useremail);

}catch(error){
    res.status(400).send("invalid email")
}
})



app.get("/",(req,res)=>{
    res.send("hello from the new server");
})

app.listen(port,()=>{
    console.log(`listening on the port ${port}`)
})