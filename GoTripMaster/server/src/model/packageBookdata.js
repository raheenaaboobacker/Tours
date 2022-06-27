const mongoose=require('mongoose');
mongoose.connect("mongodb+srv://raheena:raheena%40123@cluster1.zmtjd.mongodb.net/tourismsite?retryWrites=true&w=majority",()=>console.log("dbconnected !!"))
const Schema=mongoose.Schema;

const packageBookSchema= new Schema({
    category_id:{type:Number,required:true},
    login_id:{type:Schema.Types.ObjectId,ref:"login_tb"},
    package_id:{type:Schema.Types.ObjectId,ref:"packagedata"},
    c_id:{type:Schema.Types.ObjectId,ref:"login_tb"},
    PassengerDetails:{type: Array, required: true}
    // [{
    //     adhar_no : {type: Number},
    //     passport_no : {type: Number},
    //     e_date:{type: String}
    // }]
    ,
    num:{ type: String, required: true } 
   
},{strict:false});
var packageBookdata=mongoose.model('packageBookdata',packageBookSchema);
module.exports=packageBookdata;