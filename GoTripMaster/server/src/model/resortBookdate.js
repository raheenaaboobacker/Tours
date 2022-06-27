const mongoose=require('mongoose');
mongoose.connect("mongodb+srv://raheena:raheena%40123@cluster1.zmtjd.mongodb.net/tourismsite?retryWrites=true&w=majority",()=>console.log("dbconnected !!"))
const Schema=mongoose.Schema;

const resortBookSchema= new Schema({
    login_id:{type:Schema.Types.ObjectId,ref:"login_tb"},
   resort_id:{type:Schema.Types.ObjectId,ref:"resortdata"},
   checkin:{type: String, required: true },
   checkout:{ type: String, required: true } ,
   rooms:{ type: Number, required: true } ,
    count:{ type: Number, required: true } ,
    children:{ type: Number, required: true } ,
  
  
   
},{strict:false});
var resortBookdata=mongoose.model('resortBookdata',resortBookSchema);
module.exports=resortBookdata;