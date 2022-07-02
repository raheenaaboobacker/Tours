import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Footer from '../../Components/Footer';
import { useNavigate } from 'react-router-dom'
import AdminNav from '../../Components/AdminNav';

function AdminViewResortBooking() {
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
            fetch('http://localhost:5000/admin/showBookedResort', {
                method: 'GET',
               
        }).then(res => res.json())
         .then((response)=>{
                    console.log(response.Userdetails);
                    setItem(response.Userdetails)
                    console.log(JSON.stringify(item));
})
        }
    },[])
  
// const handleClickOpen=(id)=>{
//     console.log(id);
//     axios.delete(`http://localhost:5000/user/deleteBookedResort/${id}`)
// .then((response)=>{
//     console.log(response.data);
//     setMessage(response.data.message)
//    alert(response.data.message)
// })
// } 
  return (
    <div>
        <AdminNav/>
        <div className="slider-area ">
               
               <div className="single-slider slider-height2 d-flex align-items-center" style={{ backgroundImage: "url(" + "assets/img/hero/h1_hero.jpg" + ")"}} >
                   <div className="container">
                       <div className="row">
                           <div className="col-xl-12">
                               <div className="hero-cap text-center">
                                   <h2>BOOKED RESORTS</h2>
                               </div>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
        <div class="favourite-place place-padding">
            <div class="container">
                <div className="row">
                    {item
                    
                    .map((u)=>(
                        <div className="col-xl-4 col-lg-4 col-md-6">
                        <div className="single-place mb-30">
                            <div className="place-img">
                            <img style={{minHeight:"320px"}}src={`./upload/rooms/${u?.resortdata[0]?.image}`} alt=""/>
                            </div>
                            <div className="place-cap">
                                <div className="place-cap-top">
                                <h3>{u?.userdata[0]?.name}</h3>
                                <p className="dolor">{u.rooms} <span> Rooms</span></p>
                                <p className="dolor">₹{u.rooms*u?.resortdata[0]?.price} </p>
                                <h3>{u?.resortdata[0]?.rname}</h3>
                                <h4>{u?.resortdata[0]?.description}</h4>
                                <h5>check In :{u?.checkin}</h5>
                                <h5>check Out :{u?.checkout}</h5>
                                <h5>Adults :{u?.count}</h5>
                                <h5>Childrens :{u?.children}</h5>
                                <h5>Phone no:{u?.userdata[0]?.phone}</h5>
                                </div>
                                <div className="col-xl-5">
                                  
                                
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

export default AdminViewResortBooking