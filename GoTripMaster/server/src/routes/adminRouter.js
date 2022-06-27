const express=require('express')
const jwt = require('jsonwebtoken')
const bcrypt=require("bcryptjs")
const login=require("../model/logindata")
const register=require('../model/registerdata')
const resort=require("../model/resortdata")
const payment=require("../model/paymentdata")
const feedback=require("../model/feedbackdata")
const resortbook=require('../model/resortBookdate')
const adminRouter=express.Router();

adminRouter.get("/getcordinatordatas",((req,res)=>{
    login.aggregate([
        {
          $lookup:
          {
            from:'registerdatas',
            localField:'_id',
            foreignField:'login_id',
                     
            as:"registerdetails"
          }
        },
        {
            $match:
            {
                role:1
            }
        }
       
    ]).then(function(data){
            
        res.status(200).json({
            success:true,
            error:false,
            data:data
        })
    })
}))

adminRouter.post('/approveusers/:id',(req,res)=>{
    const id=req.params.id
    console.log(id);
    login.updateOne({_id:id},{$set:{status:1}})
    .then((user)=>{
        console.log(user);
        res.status(200).json({
            success:true,
            error:false,
            message:"approved"
        })
    }).catch(err => {
        return res.status(401).json({
            message: "Something went Wrong!"
        })
    })
})

adminRouter.delete('/delete/:id',(req, res)=>{
    const id = req.params.id
    login.deleteOne({_id:id})
    
    .then(function(){
        
        register.deleteOne({login_id:id})
        .then(()=>{
            res.status(200).json({
                success:true,
                error:false,
                message:'deleted!'
            })
        })
      
    })
    .catch(err=>{
        return res.status(401).json({
            message: "Something went Wrong!"
        })
    })
})

adminRouter.get("/getuserdata",((req,res)=>{
    login.aggregate([
        {
          $lookup:
          {
            from:'registerdatas',
            localField:'_id',
            foreignField:'login_id',
                     
            as:"registerdetails"
          }
        },
        {
            $match:
            {
                role:2
            }
        }
       
    ]).then(function(data){
            
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
}))


adminRouter.get("/getresortdatas",((req,res)=>{
    
    login.aggregate([
        {
            $lookup: {
                from: 'resortdatas', 
                localField: '_id', 
                foreignField: 'login_id', 
                as: 'registerdetails'
            }
        }, {
            $match: {
                role: 3
            }
        }
    ]).then(function(data){
            
        res.status(200).json({
            success:true,
            error:false,
            data:data
        })
    })
}))
adminRouter.delete('/resortdelete/:id',(req, res)=>{
    const id = req.params.id
    login.deleteOne({_id:id})
    
    .then(function(){
        
        resort.deleteOne({login_id:id})
        .then(()=>{
            res.status(200).json({
                success:true,
                error:false,
                message:'deleted!'
            })
        })
      
    })
    .catch(err=>{
        return res.status(401).json({
            success:false,
            error:true,
            message: "Something went Wrong!"
        })
    })
})
adminRouter.get("/getpackagepaymentdata",(req,res)=>{
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
adminRouter.get("/getresortpaymentdata",(req,res)=>{
    payment.aggregate(
        [
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
        from: 'resortdatas',
        localField: 'resort_id',
        foreignField: '_id',
        as: 'resortpayment'
      }
    },{
        $unwind:'$resortpayment'
        },]).then(function(data){
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
    adminRouter.get("/viewFeedback",(req,res)=>{
        feedback.aggregate([
            {
                $lookup:{
                  
                    from: 'registerdatas',
                    localField: 'login_id',
                    foreignField: 'login_id',
                    as: 'feedbackdata'
                     
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
 })
 adminRouter.get("/showBookedResort",((req,res)=>{
   
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
module.exports=adminRouter