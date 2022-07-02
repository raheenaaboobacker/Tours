import axios from 'axios'
import React, { useState } from 'react'
import Footer from '../../Components/Footer'
import HomeNav from '../../Components/HomeNav'
import UserNav from '../../Components/UserNav'
import { useNavigate } from 'react-router-dom'

function Contact() {
    const navigate=useNavigate()
    const login_id=localStorage.getItem("login_id")
    const [contact,setContact]=useState({
        id:login_id,
        email:"",
        message:"",
    })
     const handleInputChange=(e)=>{
      const {name,value}=e.target
      setContact({
          ...contact,
          [name]:value
      })
     console.log(contact);
  }
  const submitMessage=(e)=>{
    e.preventDefault();
    console.log(contact);
    axios.post("http://localhost:5000/user/sentfeedback",contact)
      .then((response)=> {
          console.log(response);
          alert(response.data.message)
          navigate("/userdashboard")
      })
  }
  return (
    <div> 
        <UserNav/>
        <div className="slider-area ">
   
    <div className="single-slider slider-height2 d-flex align-items-center" style={{ backgroundImage: "url(" + "assets/img/hero/h1_hero.jpg" + ")"}}>
        <div className="container">
            <div className="row">
                <div className="col-xl-12">
                    <div className="hero-cap text-center">
                        <h2>Contact us</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div className="row">
                    <div className="col-12"  style={{marginLeft:"20px"}}>
                        <h2 className="contact-title">Get in Touch</h2>
                    </div>
                    <div className="col-lg-8">
                        <form  style={{marginLeft:"20px",marginRight:"20px"}} onSubmit={submitMessage}>
                            <div className="row">
                            <div className="col-sm-6">
                                    <div className="form-group">
                                        <input className="form-control valid" name="name" id="name" type="text" placeholder="Enter your name" required/>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <input className="form-control valid" name='email' onChange={handleInputChange} value={contact.email}  type="email" placeholder="Email" required/>
                                    </div>
                                </div>
                                <div className="col-12"  >
                                    <div className="form-group">
                                        <textarea className="form-control w-100" name='message' onChange={handleInputChange} value={contact.message} required cols="30" rows="9"  placeholder=" Enter Message"></textarea>
                                    </div>
                                </div>
                             
                            </div>
                            <div className="form-group mt-3" style={{marginLeft:"20px"}}>
                                <button type="submit" className="button button-contactForm boxed-btn">Send</button>
                            </div>
                        </form>
                    </div>
                    <div className="col-lg-3 offset-lg-1">
                        <div className="media contact-info">
                            <span className="contact-info__icon"><i className="ti-home"></i></span>
                            <div className="media-body">
                                <h3>Buttonwood, California.</h3>
                                <p>Rosemead, CA 91770</p>
                            </div>
                        </div>
                        <div className="media contact-info">
                            <span className="contact-info__icon"><i className="ti-tablet"></i></span>
                            <div className="media-body">
                                <h3>+1 253 565 2365</h3>
                                <p>Mon to Fri 9am to 6pm</p>
                            </div>
                        </div>
                        <div className="media contact-info">
                            <span className="contact-info__icon"><i className="ti-email"></i></span>
                            <div className="media-body">
                                <h3>support@colorlib.com</h3>
                                <p>Send us your query anytime!</p>
                            </div>
                        </div>
                    </div>
                </div>
<Footer/>
</div>
  )
}

export default Contact