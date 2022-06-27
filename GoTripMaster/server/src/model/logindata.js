const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://raheena:raheena%40123@cluster1.zmtjd.mongodb.net/tourismsite?retryWrites=true&w=majority')  //database connection
const Schema = mongoose.Schema    //schema definition

const LoginSchema = new Schema({
     username: String,
     password: String,
     role: Number,
    status:Number
})

var Logindata = mongoose.model('login_tb',LoginSchema) //model creation
module.exports=Logindata;