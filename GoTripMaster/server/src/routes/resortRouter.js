const express=require("express");
const Router=require("express")
const login=require('../model/logindata')
const register=require('../model/registerdata')
const resort=require("../model/resortdata")
const package=require("../model/packagedata")
const packageBook=require('../model/packageBookdata')
const resortbook=require("../model/resortBookdate")
const payment=require("../model/paymentdata")
const checkAuth=require("../middleware/check-auth");
var ObjectId = require('mongodb').ObjectID;

const multer=require("multer")
// const { v4: uuidv4 } = require('uuid');
const resortRouter=express.Router();

var storage=multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,"../client/public/upload/rooms")
    },
    filename: function(req,file,cb){
        cb(null,req.body.name)
    }
})
var upload=multer({storage:storage})
resortRouter.post('/upload',upload.single("file"),(req,res)=>{
return res.json("file uploaded")
})
resortRouter.post('/additem',checkAuth,((req,res)=>{
    var item = {
       
        rname:req.body.rname,
        description:req.body.description,
        price:req.body.price,
        rooms:req.body.rooms,
        image:req.body.image,
       
    }
    console.log(item);
    var products=resort(item);
    products.save().then(()=>{
        res.status(200).json({
            success:true,
            error:false,
            message:'Resort Details Added!'
        })
    })
    .catch(err=>{
        return res.status(401).json({
            message: "Auth failed.please login"
        })
    })
}))
resortRouter.get("/showresort/:id",((req,res)=>{
    const id = req.params.id
    console.log(id);
    resort.find({_id:id})
    .then((data)=>{
        console.log("{data}",data);
        res.status(200).json({
            success:true,
            error:false,
            data:data
        })
    }) 
    .catch(err=>{
        return res.status(401).json({
            message: "Auth failed,Please login"
        })
    })
}))

resortRouter.delete("/deleteresort/:id",((req,res)=>{
    const id = req.params.id
    resort.deleteOne({_id:id})
    .then(()=>{
        res.status(200).json({
            success:true,
            error:false,
            message:'deleted!'
        })
    })
    .catch(err=>{
        return res.status(401).json({
            message: "Auth failed"
        })
    })
}))
resortRouter.post("/updateresort",((req,res)=>{
    console.log(req.body)
    var item={
        _id:req.body._id,
        rname:req.body.pname,
        description:req.body.description,
        price:req.body.price,
        image:req.body.image,
 
    }
    console.log("updatedddd idd"+item);
    resort.findByIdAndUpdate({_id:item._id},item) .then(()=>{
        res.status(200).json({
            success:true,
            error:false,
            message:'updated!'
        })
    })
}))
resortRouter.get("/showBookedResorts/:id",((req,res)=>{
    const id = req.params.id
    console.log(id);
    resortbook.aggregate([
         {
           $lookup: {
             from: 'resortdatas', 
             localField: 'resort_id', 
             foreignField: '_id', 
             as: 'resortdata'
           }
         },
        
          {
           $lookup: {
             from: 'registerdatas', 
             localField: 'login_id', 
             foreignField: 'login_id', 
             as: 'userdata'
           }
         },  
         {
             $match:{
                resort_id:ObjectId(id)
             }
         }
        
       ])
     .then(function(data){
         console.log("dataaaa",data);   
    res.status(200).json({
        success:true,
        error:false,
        Userdetails:data
    })
 }) 
 }))
 resortRouter.get("/getresortpaymentdata/:id",(req,res)=>{
    const r_id = req.params.id
   console.log(r_id);
    payment.aggregate(
        [
    {
        $lookup: 
       {
        from: 'registerdatas',
        localField: 'login_id',
        foreignField: 'login_id',
        as: 'payment'
      }
    },
    {
        $unwind:'$payment'
    },
    {
        $match:{
           resort_id:ObjectId(r_id)
        }
    }
]).then(function(data){
                console.log(data);
        res.status(200).json({
            success:true,
            error:false,
            data:data
        })
    })
    .catch(err=>{
        return res.status(401).json({
            message: "something wrong"
        })
    })
    })
// resortRouter.post('/multupload',
//  upload.array('imagesArray', 8), (req, res, next) => {
//     console.log("somethingggg");
//     const reqFiles = [];

//     const url = req.protocol + '://' + req.get('host')

//     for (var i = 0; i < req.files.length; i++) {
//         reqFiles.push(url + '/public/' + req.files[i].filename)
//         console.log(reqFiles)
//     }

//     // const user = new File({
//     //     _id: new mongoose.Types.ObjectId(),
//     //     imagesArray: reqFiles
//     // });
//     // user.save().then(result => {
//     //     res.status(201).json({
//     //         message: "Uploaded!",
//     //         userCreated: {
//     //             _id: result._id,
//     //             imagesArray: result.imagesArray
//     //         }
//     //     })
//     // }).catch(err => {
//     //     console.log(err),
//     //         res.status(500).json({
//     //             error: err
//     //         });
//     // })
// })
module.exports=resortRouter;