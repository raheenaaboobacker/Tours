const mongoose=require('mongoose');
mongoose.connect("mongodb+srv://raheena:raheena%40123@cluster1.zmtjd.mongodb.net/tourismsite?retryWrites=true&w=majority",()=>console.log("dbconnected !!"))
const Schema=mongoose.Schema;

const feedbackSchema= new Schema({
    login_id:{type:Schema.Types.ObjectId,ref:"login_tb"},
    message:{ type: String, required: true } 
   
   
},{strict:false});
var feedbackdata=mongoose.model('feedbackdata',feedbackSchema);
module.exports=feedbackdata;