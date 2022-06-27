const mongoose=require('mongoose');
mongoose.connect("mongodb+srv://raheena:raheena%40123@cluster1.zmtjd.mongodb.net/tourismsite?retryWrites=true&w=majority",()=>console.log("dbconnected !!"))
const Schema=mongoose.Schema;

const resortSchema= new Schema({
    login_id:{type:Schema.Types.ObjectId,ref:"login_tb"},
    name:{ type: String, required: true } ,
    place:{ type: String, required: true } ,
    email:{ type: String, required: true } ,
    phone:{ type: String, required: true }, 
    address:{ type: String, required: true } ,
    rname:{ type: String, required: true } ,
    description:{ type: String, required: true } ,
    price:{ type: String, required: true } ,
    rooms:{ type: String, required: true } ,
    image:{ type: String, required: true } 
   
},{strict:false});
var resortdata=mongoose.model('resortdata',resortSchema);
module.exports=resortdata;