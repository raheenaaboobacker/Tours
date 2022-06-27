const express=require("express");
const Router=require("express")
const login=require('../model/logindata')
const register=require('../model/registerdata')
const resort=require("../model/resortdata")
const package=require("../model/packagedata")
const packageBook=require('../model/packageBookdata')
const payment=require("../model/paymentdata")

const multer=require("multer")
const checkAuth=require("../middleware/check-auth");
const packageBookdata = require("../model/packageBookdata");
var ObjectId = require('mongodb').ObjectID;

const CordinatorRouter=express.Router();

var storage=multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,"../client/public/upload")
    },
    filename: function(req,file,cb){
        cb(null,req.body.name)
    }
})
var upload=multer({storage:storage})
CordinatorRouter.post('/upload',upload.single("file"),(req,res)=>{
return res.json("file uploaded")
})
CordinatorRouter.post('/additem',checkAuth,((req,res)=>{
    var item = {
        category_id:req.body.category_id,
        login_id:req.userData.userId,
        pname:req.body.pname,
        description:req.body.description,
        country:req.body.country,
        price:req.body.price,
        image:req.body.image,
       
    }
    console.log(item);
    var products=package(item);
    products.save().then(()=>{
        res.status(200).json({
            success:true,
            error:false,
            message:'Package Added!'
        })
    })
}))
CordinatorRouter.get("/showBookedPackage",checkAuth,((req,res)=>{
//    let id=req.userData.userId
    packageBook.aggregate([{$lookup: {
        from: 'packagedatas',
        localField: 'package_id',
        foreignField: '_id',
        as: 'packagedata'
      }}, {$lookup: {
        from: 'registerdatas',
        localField: 'login_id',
        foreignField: 'login_id',
        as: 'userdata'
      }}, {$lookup: {
        from: 'login_tbs',
        localField: 'c_id',
        foreignField: '_id',
        as: 'cordinatordata'
      }}])
    .then(function(data){
        // console.log("dataaaa",data);   
   res.status(200).json({
       success:true,
       error:false,
       Userdetails:data
   })
}) 
}))
CordinatorRouter.get("/showpackage",checkAuth,((req,res)=>{
    const id = req.userData.userId
    console.log(id);
    package.find({login_id:id})
    .then((data)=>{
        console.log("{data}",data);
        res.status(200).json({
            success:true,
            error:false,
            data:data
        })
    })
}))

CordinatorRouter.delete("/deletePackage/:id",((req,res)=>{
    const id = req.params.id
    package.deleteOne({_id:id})
    .then(()=>{
        res.status(200).json({
            success:true,
            error:false,
            message:'deleted!'
        })
    })
}))
CordinatorRouter.get("/findupdatedata/:id",((req,res)=>{
    const id = req.params.id
    console.log(id);
    package.find({_id:id})
    .then((data)=>{
        // console.log("{data}",data);
        res.status(200).json({
            success:true,
            error:false,
            data:data
        })
    })
}))
CordinatorRouter.post("/updatepackage",((req,res)=>{
    var item={
        _id:req.body._id,
        pname:req.body.pname,
        description:req.body.description,
        price:req.body.price,
        image:req.body.image,
 
    }
    // console.log("updatedddd idd"+item);
    package.findByIdAndUpdate({_id:item._id},item) .then(()=>{
        res.status(200).json({
            success:true,
            error:false,
            message:'updated!'
        })
    })
}))
CordinatorRouter.get("/getpackagepaymentdata",(req,res)=>{
    payment.aggregate([
        {$lookup:
             {
        from: 'registerdatas',
        localField: 'login_id',
        foreignField: 'login_id',
        as: 'payment'
      }
    },{
    $unwind:'$payment'
    },
     {$lookup: 
        {
        from: 'packagebookdatas',
        localField: 'packageBook_id',
        foreignField: '_id',
        as: 'packagepayment'
      }
    }, {
        $unwind:'$packagepayment'
        },
    {$lookup:
         {
        from: 'packagedatas',
        localField: 'package_id',
        foreignField: '_id',
        as: 'packagedetails'
      }
    },{
        $unwind:'$packagedetails'
        },
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
module.exports=CordinatorRouter;