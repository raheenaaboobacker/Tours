const mongoose=require('mongoose');
mongoose.connect("mongodb+srv://raheena:raheena%40123@cluster1.zmtjd.mongodb.net/tourismsite?retryWrites=true&w=majority",()=>console.log("dbconnected !!"))
const Schema=mongoose.Schema;

const packageSchema= new Schema({
    category_id:{type:Number,required:true},
    login_id:{type:Schema.Types.ObjectId,ref:"login_tb"},
    pname:{ type: String, required: true } ,
    description:{ type: String, required: true } ,
    country:{ type: String, required: true } ,
    price:{ type: String, required: true } ,
    image:{ type: String, required: true } 

    
   
},{strict:false});
var packagedata=mongoose.model('packagedata',packageSchema);
module.exports=packagedata;