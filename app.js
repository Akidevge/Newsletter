// jshint esversion: 6;
const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express()
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",(req,res)=>
{
    res.sendFile(__dirname+"/signup.html");
})
app.post("/",(req,res)=>
{
    const name=req.body.nameofguy;
    const email=req.body.emailofguy;
    const data={
        members:[
            {
            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME: name,
                LNAME:"Quen",
            }}
        ]
    };
    var jsondata=JSON.stringify(data);
    const url="https://us10.api.mailchimp.com/3.0/lists/8558605d3e";
    const options={
        method:"POST",
        auth:"Akid:1d4980a31b628c900c814927167dd78e-us10"
    }
    const request=https.request(url,options,(response)=>{
        if(response.statusCode===200)
        {
            res.sendFile(__dirname+"/success.html");
        }
        else
        {
            res.sendFile(__dirname+"/fail.html");
        }
        response.on("data",(data)=>{
            // console.log(JSON.parse(data));
        })
    })
    request.write(jsondata);
    request.end();
})
app.post("/success",(req,res)=>
{
    res.redirect("/")
})


//apikey:1d4980a31b628c900c814927167dd78e-us10
//audienceid:8558605d3e

app.listen(process.env.PORT || 3000,()=>{console.log("Server running on port 3000")})