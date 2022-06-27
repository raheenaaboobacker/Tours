const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
const app=express();
app.use(cors());
app.use(express.json())
app.use(express.static('./public'));
app.use(express.urlencoded({extended:true}))
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
  });
const registerRouter=require('./src/routes/registerRouter')
const LoginRouter=require("./src/routes/loginRouter")
const adminRouter=require("./src/routes/adminRouter")
const CordinatorRouter=require("./src/routes/CordinatorRouter")
const userRouter=require("./src/routes/userRouter")
const resortRouter=require("./src/routes/resortRouter")
app.use('/',registerRouter)
app.use('/login',LoginRouter)
app.use('/admin',adminRouter)
app.use('/cordinator',CordinatorRouter)
app.use('/user',userRouter)
app.use('/resort',resortRouter)

  app.listen(5000,function(){
    console.log("listening to: http://localhost:5000/")
});

