import React, { useEffect, useState } from 'react'
import {Row,Col,Button} from 'react-bootstrap'
import { Link,useNavigate } from 'react-router-dom'
import Footer from '../../Components/Footer'
import AdminNav from '../../Components/AdminNav'
import AboutCompnt from '../../Components/AboutCompnt'

function Admindashboard() {
    const [item,setItem]=useState([])
    const navigate=useNavigate()
    const [token,setToken]=useState(localStorage.getItem("token"))
    useEffect(()=>{
      
        console.log(token);
        fetch('http://localhost:5000/user/getAllPackages', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization':'Bearer '+token,
          },
  }).then(res => res.json())
  .then((response)=>{
    console.log(response.data);
    setItem(response.data)
    console.log(item);
  })
      },[])
  return !token ? (
    navigate("/login")): (
    <div>
        <AdminNav/>
        <div className="slider-area ">
        <div className="slider-active">
                   <div className="single-slider hero-overly  slider-height d-flex align-items-center" style={{ backgroundImage: "url(" + "assets/img/hero/h1_hero.jpg" + ")"}}  >
                       <div className="container">
                           <div className="row">
                               <div className="col-xl-9 col-lg-9 col-md-9">
                                   <div className="hero__caption">
                                       <h1>Best Tourism Site To Explore The World </h1>
                                       
                                   </div>
                               </div>
                           </div>
                         
                           <div className="row">
                               <div className="col-xl-12">
                                  
                                 	
                               </div>
                           </div>
                       </div>
                   </div>
               </div>
               <div class="favourite-place place-padding">
                <div class="container">
                    
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="section-tittle text-center">
                                <h2>Favourite Places</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {item.map((u)=>(
                            <div className="col-xl-4 col-lg-4 col-md-6">
                            <div className="single-place mb-30">
                                <div className="place-img">
                                    <img style={{minHeight:"345px"}}src={`./upload/${u.image}`} alt=""/>
                                </div>
                                <div className="place-cap">
                                    <div className="place-cap-top">
                                       
                                    <h3>{u.pname}<span style={{paddingLeft:25}}>{u.category_id===1?<><img style={{width:35,height:35}} src='https://i.pinimg.com/564x/12/8c/d6/128cd630c3fdc4c6d9dea5ca5c6624d7.jpg'/></>:null}</span></h3>
                                        <p className="dolor">₹{u.price} <span>/ Per Person</span></p>
                                        {u.description}
                                    </div>
                                   
                                </div>
                            </div>
                        </div>
                        ))}
                        
                       
                       
                      
                    </div>
                </div>
            </div>
           </div>
           <AboutCompnt/>
           <Footer/>
           </div>
  )
}

export default Admindashboard