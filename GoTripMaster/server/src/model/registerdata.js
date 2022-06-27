const mongoose=require('mongoose');
mongoose.connect("mongodb+srv://raheena:raheena%40123@cluster1.zmtjd.mongodb.net/tourismsite?retryWrites=true&w=majority",()=>console.log("dbconnected !!"))
const Schema=mongoose.Schema;

const registerSchema= new Schema({
    r_id:{type:Schema.Types.ObjectId,ref:"resortdata"},
    login_id:{type:Schema.Types.ObjectId,ref:"login_tb"},
    name:{ type: String, required: true } ,
    email:{ type: String, required: true } ,
    phone:{ type: String, required: true } 
    
   
},{strict:false});
var registerdata=mongoose.model('registerdata',registerSchema);
module.exports=registerdata;