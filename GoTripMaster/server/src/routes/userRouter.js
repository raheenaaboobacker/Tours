const express=require("express");
const Router=require("express")
const login=require('../model/logindata')
const register=require('../model/registerdata')
const resort=require("../model/resortdata")
const package=require("../model/packagedata")
const packageBook=require("../model/packageBookdata")
const resortBook=require("../model/resortBookdate")
const payment=require("../model/paymentdata")
const feedback=require("../model/feedbackdata")
const userRouter=express.Router();
const checkAuth=require("../middleware/check-auth")
var ObjectId = require('mongodb').ObjectID;

userRouter.get('/getAllPackages',(req,res)=>{
    package.find()
    .then((data)=>{
        console.log("{data}",data);
        res.status(200).json({
            success:true,
            error:false,
            data:data
        })
    })
})
userRouter.get('/getAllResorts',(req,res)=>{
    resort.find()
    .then((data)=>{
        console.log("{data}",data);
        res.status(200).json({
            success:true,
            error:false,
            data:data
        })
    })
})
userRouter.get('/singleitem/:id',(req,res)=>{
    const id = req.params.id
    package.find({_id:id})
    .then((data)=>{
        res.status(200).json({
            success:true,
            error:false,
            data:data
        })   
     })
   
})
userRouter.get('/singleresort/:id',(req,res)=>{
    const id = req.params.id
    resort.find({_id:id})
    .then((data)=>{
        res.status(200).json({
            success:true,
            error:false,
            data:data
        })
    })
   
})
userRouter.post('/payPackages',checkAuth,(req,res)=>{
    var item = {
        category_id:req.body.category_id,
        login_id:req.userData.userId,
        package_id:req.body.id,
        num:req.body.num,
        c_id:req.body.c_id
    }
    console.log(item);
    var data=packageBook(item);
    data.save()
    .then((data)=>{
        var paymentData = {
            login_id:req.userData.userId,
            packageBook_id:data._id,
            package_id:req.body.id,
            total:req.body.total
        }
        console.log(paymentData);
        var paymentValue = payment(paymentData)
        paymentValue.save()
        res.status(200).json({
            success:true,
            error:false,
            message:'Package Booked!'
        })
    })
    
    .catch(err=>{
        return res.status(401).json({
            message: "Something went wronge"
        })
    })
})
userRouter.post('/payInternationalPackage',checkAuth,(req,res)=>{
    console.log(req.body);
       var item = {
        login_id:req.userData.userId,
        category_id:req.body.bookdata[0].category_id,
        package_id:req.body.bookdata[0].package_id,
        c_id:req.body.bookdata[0].c_id,
        PassengerDetails:req.body.bookdata.PassengerDetails,
        num:req.body.num,
    }
    console.log(item);
    var data=packageBook(item);
    data.save()
    .then((data)=>{
        console.log(data);
        var paymentData = {
            login_id:req.userData.userId,
            packageBook_id:data._id,
            package_id:req.body.bookdata[0].package_id,
            total:req.body.total
        }
        console.log(paymentData);
        var paymentValue = payment(paymentData)
        paymentValue.save()
    })
     .then(()=>{
        res.status(200).json({
            success:true,
            error:false,
            message:'Package  Booked!'
        })
    })
    .catch(err=>{
        return res.status(401).json({
            message: "Something went wronge"
        })
    })
})
userRouter.post('/payResort',checkAuth,(req,res)=>{
    console.log(req.body);
       var item = {
        login_id:req.userData.userId,
        resort_id:req.body.bookdata.resort_id,
        checkin:new Date(req.body.bookdata.checkin).toDateString(),
        checkout:new Date(req.body.bookdata.checkout).toDateString() ,
        rooms:req.body.bookdata.rooms,
        count:req.body.bookdata.count,
        children:req.body.bookdata.children
    }
    console.log(item);
    var data=resortBook(item);
    data.save()
    .then((data)=>{
        var paymentData = {
            login_id:req.userData.userId,
            resortBook_id:data._id,
            resort_id:req.body.bookdata.resort_id,
            total:req.body.total
        }
        console.log(paymentData);
        var paymentValue = payment(paymentData)
        paymentValue.save()
    })
     .then(()=>{
        res.status(200).json({
            success:true,
            error:false,
            message:'Resort  Booked!'
        })
    })
    .catch(err=>{
        return res.status(401).json({
            message: "Something went wronge"
        })
    })
})
userRouter.post("/sentfeedback",(req,res)=>{
    console.log("logindata====",req.body)
    var item={
        login_id:req.body.id,
        message:req.body.message
    }
    var messageitem = feedback(item)
    messageitem.save()
    .then(()=>{
        res.status(200).json({
            success:true,
            error: false,
            message:'feedback sended'
        })
    })
})
userRouter.get("/BookedPackage/:id",(req,res)=>{
 const id=req.params.id
 packageBook.aggregate([
        {
        $lookup: {
            from: 'packagedatas',
            localField: 'package_id',
            foreignField: '_id',
            as: 'bookedData'
        }
    },{
        $match:
        {
            login_id:ObjectId(id)
        }
    }
])  .then((bookedData)=>{
    res.status(200).json({
        success:true,
        error:false,
        message:bookedData
    })
})
.catch(err=>{
    return res.status(401).json({
        message: "Something went wronge"
    })
})
})
userRouter.get("/BookedResort/:id",(req,res)=>{
    const id=req.params.id
    resortBook.aggregate([
           {
           $lookup: {
               from: 'resortdatas',
               localField: 'resort_id',
               foreignField: '_id',
               as: 'bookedData'
           }
       },{
           $match:
           {
               login_id:ObjectId(id)
           }
       }
   ])  .then((bookedData)=>{
       res.status(200).json({
           success:true,
           error:false,
           message:bookedData
       })
   })
   .catch(err=>{
       return res.status(401).json({
           message: "Something went wronge"
       })
   })
   })
userRouter.delete("/deleteBookedPackage/:id",(req,res)=>{
    const id=req.params.id
    console.log(id);
    packageBook.deleteOne({_id:id})
    .then(function(){
        
        payment.deleteOne({packageBook_id:id})
        .then(()=>{
            res.status(200).json({
                success:true,
                error:false,
                message:'Canceled!'
            })
        })
      
    })
    .catch(err=>{
        return res.status(401).json({
            message: "Something went Wrong!"
        })
    })
})
userRouter.delete("/deleteBookedResort/:id",(req,res)=>{
    const id=req.params.id
    console.log(id);
    resortBook.deleteOne({_id:id})
    .then(function(){
        
        payment.deleteOne({resortBook_id:id})
        .then(()=>{
            res.status(200).json({
                success:true,
                error:false,
                message:'Canceled!'
            })
        })
      
    })
    .catch(err=>{
        return res.status(401).json({
            message: "Something went Wrong!"
        })
    })
})
module.exports=userRouter;