import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import CoordinatorNav from '../../Components/CoordinatorNav'
import Footer from '../../Components/Footer'
import { useNavigate } from 'react-router-dom'

function CoordinatorDashboard() {
    const [item,setItem]=useState([])
    const [token,setToken]=useState(localStorage.getItem("token"))
    const [tokenId,setTokenId]=useState(localStorage.getItem("login_id"))
    const navigate=useNavigate()
     
      console.log(tokenId);
    useEffect(()=>{
   
      fetch('http://localhost:5000/cordinator/showBookedPackage', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization':'Bearer '+token,
        },
}).then(res => res.json())
 .then((response)=>{
            console.log(response.Userdetails);
            setItem(response.Userdetails)
            console.log(JSON.stringify(item));
          
        })
    },[])
  
 
  return !token ? (
    navigate("/login")):(
    <div>
      <CoordinatorNav/>
      <div className="slider-area ">
           
           <div className="single-slider slider-height2 d-flex align-items-center" style={{ backgroundImage: "url(" + "assets/img/hero/contact_hero.jpg" + ")"}} >
               <div className="container">
                   <div className="row">
                       <div className="col-xl-12">
                           <div className="hero-cap text-center">
                               <h2>BOOKED PACKAGES</h2>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
       </div>
       <div className="favourite-place place-padding">
                <div className="container">
                    
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-tittle text-center">
                               
                                <h2>BOOKED PACKAGES</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {item.filter((filterdata) => {
              return filterdata.packagedata[0].login_id.includes(tokenId)
            })
                        .map((u)=>(
                            <div className="col-xl-4 col-lg-4 col-md-6">
                            <div className="single-place mb-30">
                                <div className="place-img">
                                    <img style={{minHeight:"320px"}}src={`./upload/${u.packagedata[0].image}`} alt=""/>
                                </div>
                                <div className="place-cap">
                                    <div className="place-cap-top">
                                       
                                        <h3><a href="#">{u.packagedata[0].pname}</a></h3>
                                        <p className="dolor">₹{u.packagedata[0].price} <span>/ Per Person</span></p>
                                        <h4>No of users : {u.num}</h4>
                                            <p>  user details </p>
                                           
                                            <ul>
                                              <li><h5> {u.userdata[0].name}</h5></li>
                          
                                              <li><h5>  {u.userdata[0].phone}</h5></li>
                                              <li><h5>  {u.userdata[0].email}</h5></li>
                                            </ul>
                                        </div>
                                        <div className="place-cap-bottom">
                                        {u.category_id==1?<Button type="button"  className="btn btn-secondary">View Details</Button>:null}

                                    </div>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer/>
      
          </div>
  )
}

export default CoordinatorDashboard