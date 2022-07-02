import {React,useState} from 'react'
import { toast,ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import {TextField} from '@mui/material'
import {Form,Button} from "react-bootstrap"
import { useNavigate,Link } from 'react-router-dom';
import Footer from '../Components/Footer';
import HomeNav from '../Components/HomeNav';
function Register() {
    const navigate=useNavigate()
    const [contacts,setContacts]=useState({
      uname:"",
      name:"",
      email:'',
      phone:"",
      password:'',
     role:2
    });
  
    const handleInputChange=(e)=>{
        const {name,value}=e.target
        setContacts({
            ...contacts,
            [name]:value
        })
       console.log(JSON.stringify(contacts));
    
    }
    const addContacts=(e)=>{
        e.preventDefault()
        var phoneno = /^\(?([0-9]{10})$/;
        if(contacts.role===''){
          toast.warning("Please choose role!!",{autoClose:3000,theme:'light'})
        }else
        if(contacts.uname===''){
          toast.warning("Please enter user name!!",{autoClose:3000,theme:'light'})

        }else  if(contacts.name===''){
          toast.warning("Please enter name!!",{autoClose:3000,theme:'light'})

        }else  if(contacts.password===''){
          toast.warning("Please eneter password!!",{autoClose:3000,theme:'light'})

        }
       else if(!phoneno.test(contacts.phone))
        {
            toast.warning("Please enter a valid  phone number!!",{autoClose:3000,theme:'light'})
        }
        else {
            const header ={
              'Content-Type': 'application/json',
              
             }
     
            axios.post("http://localhost:5000/register",contacts,header) .then((response)=> {
              console.log("REGISTER RESULT======",response);
              if(response.data.success==true)
              {
                
                
                  alert(response.data.message);
                  navigate('/login')
                 
     
              }
     
             else{
                 alert(response.data.message);
             }
             
     
            })
            .catch((error) => {
              console.log(error);
             
              alert(error.response.data.message)
             
            });
          }
          }
  return (
    <div>
      <HomeNav/>
        <div className="slider-area ">
               
               <div className="slider-active">
                   <div className="single-slider hero-overly  slider-height d-flex align-items-center" style={{ backgroundImage: "url(" + "assets/img/hero/h1_hero.jpg" + ")"}}  >
                       <div className="container">
                           <div className="row">
                               <div className="col-xl-11 col-lg-11 col-md-11">
                               <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-lg-10 col-xl-9">
        <div className="card rounded-3">
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img3.webp"
            className="w-100" style={{borderTopLefttRadius: ".3rem", borderTopRightRadius: ".3rem"}}
            alt="Sample photo"/>
          <div className="card-body p-4 p-md-5">
            <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Registration Info</h3>

            <form className='container' onSubmit={addContacts}>
                  <Form.Group className="mb-3" controlId="formBasic">
                  <TextField fullWidth  id="outlined-basic" label="User Name" variant="outlined" name='uname' 
                  onChange={handleInputChange} value={contacts.uname} required/><br/><br/>
                  <TextField fullWidth  id="outlined-basic1" label="Name" variant="outlined" name='name' 
                  onChange={handleInputChange} value={contacts.name} required/><br/><br/>
                  <TextField fullWidth  id="outlined-basic2" label="Email" variant="outlined" name='email' type="email"
                  onChange={handleInputChange} value={contacts.email} required/><br/><br/>
                  <TextField fullWidth  id="outlined-basic3" label="Phone Nomber" variant="outlined" name='phone' 
                  onChange={handleInputChange} value={contacts.phone} required/><br/><br/>

                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasic">
                  <TextField fullWidth  id="outlined-password-input" label="Password" type="password" autoComplete="current-password"
                  name='password' onChange={handleInputChange} value={contacts.password} required  />
                  
                  </Form.Group>
                  <div className="d-grid gap-2">

                  <div className="d-grid gap-2">

                  <Button variant="secondary" type="submit" size="lg" >
                  Submit
                  </Button>
                  <p class="text-center text-muted mt-5 mb-0">Have already an account?<span><Link to='/login'>

                  <h6>Login here</h6>
                  </Link></span></p>
                </div>
              </div>
            </form>
            <ToastContainer/>
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

export default Register