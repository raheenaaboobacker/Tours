const mongoose=require('mongoose');
mongoose.connect("mongodb+srv://raheena:raheena%40123@cluster1.zmtjd.mongodb.net/tourismsite?retryWrites=true&w=majority",()=>console.log("dbconnected !!"))
const Schema=mongoose.Schema;

const PaymentSchema = new Schema({
     login_id:{ type: Schema.Types.ObjectId, ref: "login_tb", required: true },
     packageBook_id:{ type: Schema.Types.ObjectId, ref: "packageBookdata", required: false },
     package_id:{ type: Schema.Types.ObjectId, ref: "packagedatas", required: false },
     resortBook_id:{ type: Schema.Types.ObjectId, ref: "resortBookdata", required: false },
     resort_id:{ type: Schema.Types.ObjectId, ref: "resortdatas", required: false },
     total:{ type: String, required: true },
})

var Paymentdata = mongoose.model('paymentdata',PaymentSchema) //model creation
module.exports=Paymentdata;