import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Footer from '../../Components/Footer';
import UserNav from '../../Components/UserNav'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap';



function ShowBookedResort() {
    const [item,setItem]=useState([]);
    const [message,setMessage]=useState([])
    const id=localStorage.getItem("login_id")
    const navigate=useNavigate()
    const [token,setToken]=useState(localStorage.getItem("token"))
  
    console.log(id);
    useEffect(()=>{
        if(!token){ 
            navigate("/login")
        }else{
axios.get(`http://localhost:5000/user/BookedResort/${id}`)
.then((response)=>{
    console.log(response.data);
    setItem(response.data.message)
})
        }
    },[message])
  
const handleClickOpen=(id)=>{
    console.log(id);
    axios.delete(`http://localhost:5000/user/deleteBookedResort/${id}`)
.then((response)=>{
    console.log(response.data);
    setMessage(response.data.message)
   alert(response.data.message)
})
} 
  return (
    <div>
    <UserNav/>
    <div className="slider-area ">
           
           <div className="single-slider slider-height2 d-flex align-items-center" style={{ backgroundImage: "url(" + "assets/img/hero/h1_hero.jpg" + ")"}} >
               <div className="container">
                   <div className="row">
                       <div className="col-xl-12">
                           <div className="hero-cap text-center">
                               <h2>Booked Resorts</h2>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
       </div>
    <div class="favourite-place place-padding">
            <div class="container">
                <div className="row">
                {item.length>0?<>
                        {item
                        
                        .map((u)=>(
                        <div className="col-xl-4 col-lg-4 col-md-6">
                        <div className="single-place mb-30">
                            <div className="place-img">
                            <img style={{minHeight:"320px"}}src={`./upload/rooms/${u?.bookedData[0]?.image}`} alt=""/>
                            </div>
                            <div className="place-cap">
                                <div className="place-cap-top">
                                <h3>{u?.bookedData[0]?.rname}</h3>
                                <h3>{u?.bookedData[0]?.description}</h3>
                                <p className="dolor">{u.rooms} <span> Rooms</span></p>
                                <p className="dolor">???{u.rooms*u?.bookedData[0]?.price} </p>
                                <h5>check In :{u?.checkin}</h5>
                                <h5>check Out :{u?.checkout}</h5>
                                </div>
                                <div className="col-xl-5">
                                  
                                <Button style={{padding:10,width:"110px"}} variant="warning"  onClick={()=>{handleClickOpen(u._id)}}>
                             Cancel
                          </Button> 
                          </div>
                            </div>
                           
                        </div>
                    </div>
                    ))}</>:<div style={{width:"600px", margin:"auto"}}><div style={{textAlign:"center",fontSize:20}}  className="alert alert-warning" role="alert">
                    Empty!
                   </div></div>}
                
                  
                </div>
            </div>
        </div>
        <Footer/>
</div>
  )
}

export default ShowBookedResort