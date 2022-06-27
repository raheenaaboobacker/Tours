const express=require("express");
const Router=require("express")
const bcrypt=require('bcryptjs')
const login=require('../model/logindata')
const register=require('../model/registerdata')
const resort=require("../model/resortdata")
const multer=require("multer")

const registerRouter=express.Router();
var storage=multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,"../client/public/upload/rooms")
    },
    filename: function(req,file,cb){
        cb(null,req.body.name)
    }
})
var upload=multer({storage:storage})
registerRouter.post('/upload',upload.single("file"),(req,res)=>{
return res.json("file uploaded")
})

registerRouter.post('/register',function(req,res){
    console.log(" data",req.body)
    bcrypt.hash(req.body.password,10, function(err, hashedPass){
        if(err){
           return res.status(400).json({
                success:false,
                error: true,
                message:'password hashing error'
            })
        }
        let logindata = {
            username:req.body.uname,
            password:hashedPass,
            role:req.body.role,
            status:0
        }
        console.log(logindata);
        login.findOne({username:req.body.uname})
        .then(uname=>{
            if(uname){
                console.log("username already exist!");
                return res.status(400).json({
                    success:false,
                    error: true,
                    message:'username already exist!'                    
                })
            }
            else{
                var item = login(logindata)
                item.save()
                .then((data)=>{
                    console.log("login data",data);
                  
                    login.findOne({username:logindata.username})
                    
                    .then(function(details){
                        var id = details._id
                        let items = {
                            login_id:id,
                            name:req.body.name,
                            email:req.body.email,
                            phone:req.body.phone,
                            r_id:req.body.c_Id
                        }
                        console.log(items);
                        var user_item = register(items)
                        user_item.save()
                        .then(()=>{
                            res.status(200).json({
                                success:true,
                                error: false,
                                message:'registration success'
                            })
                        })
                        
                    })
                
                
                })

            }
        })
    })
})


registerRouter.post('/resortRegister',function(req,res){
    console.log(" data",req.body)
    bcrypt.hash(req.body.password,10, function(err, hashedPass){
        if(err){
           return res.status(400).json({
                success:false,
                error: true,
                message:'password hashing error'
            })
        }
        let logindata = {
            username:req.body.uname,
            password:hashedPass,
            role:req.body.role,
            status:0
        }
        console.log(logindata);
        login.findOne({username:req.body.uname})
        .then(uname=>{
            if(uname){
                console.log("username already exist!");
                return res.status(400).json({
                    success:false,
                    error: true,
                    message:'username already exist!'                    
                })
            }
            else{
                var item = login(logindata)
                item.save()
                .then((data)=>{
                    console.log("login data",data);
                  
                    login.findOne({username:logindata.username})
                    
                    .then(function(details){
                        var id = details._id
                        let items = {
                            login_id:id,
                            name:req.body.name,
                            place:req.body.place,
                            email:req.body.email,
                            phone:req.body.phone,
                            address:req.body.address,
                            rname:req.body.rname,
                            description:req.body.description,
                            price:req.body.price,
                            rooms:req.body.rooms,
                            image:req.body.image,
                        }
                        var user_item = resort(items)
                        user_item.save()
                        .then(()=>{
                            res.status(200).json({
                                success:true,
                                error: false,
                                message:'registration success'
                            })
                        })
                        
                    })
                
                
                })

            }
        })
    })
})

module.exports=registerRouter;