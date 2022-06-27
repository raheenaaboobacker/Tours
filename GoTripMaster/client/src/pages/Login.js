import React,{ useState} from "react";
import {Form,Button,Container,Row,Col} from "react-bootstrap"
import {Link, useNavigate} from "react-router-dom"
import axios from "axios"
import {TextField} from '@mui/material'
import Footer from "../Components/Footer";
function Login() {
  const navigate=useNavigate();

  const [contacts,setContacts]=useState({
    username:'',
      password:''

  });
  
  const handleInputChange=(e)=>{
      const {name,value}=e.target
      setContacts({
          ...contacts,
          [name]:value
      })
     
  }
  const validation=(e)=>{
      e.preventDefault();
      console.log("login data"+JSON.stringify(contacts)) ;
      
      axios.post("http://localhost:5000/login/logindata",contacts)
      .then((response)=> {
        console.log("LOGIN RESULT======",response.data);
        if(response.data.success===true)
        {
        
          if(response.data.userRole===0){
            localStorage.setItem("token",response.data.token)
            localStorage.setItem("token",response.data.token)
            sessionStorage.setItem("isLoggedIn",true)
            navigate('/admindashboard')
            }
            else  if(response.data.userRole===1){
              localStorage.setItem("login_id",response.data.loginId)
              localStorage.setItem("token",response.data.token)
            
              localStorage.setItem("cname",response.data.name)
              localStorage.setItem("token",response.data.token)
              navigate('/coordinatordashboard')
              }else if(response.data.userRole===3){
                localStorage.setItem("login_id",response.data.loginId)
                localStorage.setItem("token",response.data.token)
                localStorage.setItem("resort_Id",response.data.resort_Id)
                localStorage.setItem("cname",response.data.name)
                sessionStorage.setItem("isLoggedIn",true)
                navigate('/resortDashboard')
              }
              else if(response.data.userRole===2){

                localStorage.setItem("login_id",response.data.loginId)
                localStorage.setItem("token",response.data.token)
              
                localStorage.setItem("cname",response.data.name)
                sessionStorage.setItem("isLoggedIn",true)
                    navigate('/userdashboard')
                }
          
          
          
     
          
        } else if(response.data.success==false){
          alert(response.data.message)
        }
      })
      // .catch((error) => {
      //   console.log(error);
      //   alert("Bad Credentials");
      // });
  


  }
  return (
    <div>
      <div className="slider-area ">
               
               <div className="slider-active">
                   <div className="single-slider hero-overly  slider-height d-flex align-items-center" style={{ backgroundImage: "url(" + "assets/img/hero/h1_hero.jpg" + ")"}}  >
                       <div className="container">
                           <div className="row">
                               <div className="col-xl-11 w-50  col-lg-10 col-md-10" >
                               <div className="container  py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-lg-9 col-xl-10">
        <div className="card rounded-3">
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img3.webp"
            className="w-100" style={{borderTopLefttRadius: ".3rem", borderTopRightRadius: ".3rem"}}
            alt="Sample photo"/>
          <div className="card-body p-4 p-md-5">
            <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Login Info</h3>

            <form className='container' onSubmit={validation}>
<Form.Group className="mb-3" controlId="formBasic">

<TextField fullWidth  id="outlined-basic" label="Name" type="text" variant="outlined" name='username' onChange={handleInputChange} value={contacts.username} required/>

</Form.Group>

<Form.Group className="mb-3" controlId="formBasic">
<TextField fullWidth  id="outlined-password-input" label="Password" type="password" autoComplete="current-password"
name='password' onChange={handleInputChange} value={contacts.password} required  />

</Form.Group>
<div className="d-grid gap-2">

<Button variant="secondary" type="submit" size="lg" >
Submit
</Button>
<p className="text-center text-muted mt-5 mb-0"> Sign Up?
<Link to='/register'>

sign up here
</Link>
</p>
</div>
</form>

          </div>
        </div>
      </div>
    </div>
  </div>

                               </div>
                           </div>
                         
                       </div>
                   </div>
               </div>
           </div>
           <Footer/>
  
    </div>
  )
}

export default Login