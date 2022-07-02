import React, { useEffect, useState } from 'react'
import ResortNav from '../../Components/ResortNav'
import Footer from '../../Components/Footer'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Resortdashboard() {
  const [item,setItem]=useState([])
  const navigate=useNavigate()
  const [token,setToken]=useState(localStorage.getItem("token"))

 
useEffect(()=>{
    if(!token){ 
        navigate("/login")
    }else{
 
            axios.get(`http://localhost:5000/resort/showBookedResorts/${localStorage.getItem("resort_Id")}`).then(response=>{
        setItem(response.data.Userdetails)
        });
    }
  },[])
  return (
    <div><ResortNav/>
     <div className="slider-area ">
           
           <div className="single-slider slider-height2 d-flex align-items-center" style={{ backgroundImage: "url(" + "assets/img/hero/h1_hero.jpg" + ")"}} >
               <div className="container">
                   <div className="row">
                       <div className="col-xl-12">
                           <div className="hero-cap text-center">
                               <h2 >Request For Resort </h2>
                               
                           </div>
                       </div>
                   </div>
               </div>
           </div>
       </div>
       <div className="favourite-place place-padding">
                <div className="container">
                   
                    <div className="row">
                    {item.length>0?<>
                        {item
                        .map((u)=>(
                            <div className="col-xl-4 col-lg-4 col-md-6">
                            <div className="single-place mb-30">
                            <div className="place-img">
                                    <img style={{minHeight:"320px"}}src={`./upload/rooms/${u?.resortdata[0].image}`} alt=""/>
                                </div>
                                <div className="place-cap">
                                    <div className="place-cap-top">
                                       
                                        <h3><a href="#">{u?.userdata[0]?.name}</a></h3>
                                        <p className="dolor">{u?.rooms} <span> rooms</span></p>
                                        <p className="dolor">check in:<span>{u?.checkin}</span></p>
                                        <p className="dolor">check Out:<span>{u?.checkout}</span></p>
                                        <p>  No of visitors {u.count}</p>
                                        <p>  No of Childrens {u.children}</p>
                                        <p>Contact Details:{u?.userdata[0]?.phone}</p>
                                        <p>{u?.userdata[0]?.email}</p>
                                    </div>
                                    <div className="place-cap-bottom">
                                    
                                    </div>
                                </div>
                            </div>
                        </div>
                        ))}</>:<div style={{width:"600px", margin:"auto"}}><div style={{textAlign:"center",fontSize:20}}  className="alert alert-warning" role="alert">
                        Request Not Found!
                       </div></div>}
                        
                       
                       
                      
                    </div>
                </div>
            </div>
            <Footer/>
    </div>
  )
}

export default Resortdashboard