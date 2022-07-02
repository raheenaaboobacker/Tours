import React, { useEffect,useState } from 'react'
import {Row,Col,Card,Button} from 'react-bootstrap'
import { DataGrid } from "@mui/x-data-grid";
import axios from 'axios';
import AdminNav from '../../../Components/AdminNav';
import { useNavigate } from 'react-router-dom'
import Footer from '../../../Components/Footer';

function AdminViewPaymentResort() {
  const [item,setItem]=useState([])
  const [resortitem,setResortitem]=useState([])
  const navigate=useNavigate()
  const [token,setToken]=useState(localStorage.getItem("token"))

  useEffect(()=>{
    axios.get("http://localhost:5000/admin/getresortpaymentdata").then(response=>{
      console.log(response.data.data);
      setResortitem(response.data.data)
      console.log(resortitem);
    })
  },[])
  return !token ? (
    navigate("/login")):(
    <div>
    <AdminNav/>
    <div className="slider-area ">
         
         <div className="single-slider slider-height2 d-flex align-items-center" style={{ backgroundImage: "url(" + "assets/img/hero/h1_hero.jpg" + ")"}} >
             <div className="container">
                 <div className="row">
                     <div className="col-xl-12">
                         <div className="hero-cap text-center">
                         <h2 >Resort Payment Details</h2>
                         </div>
                     </div>
                 </div>
             </div>
         </div>
     </div>
     <div className="row">
   
                    </div>
                    <div className="favourite-place place-padding">
                <div className="container">
                    
                 
                    <div className="row">
                    {resortitem?.map((item1,i)=>(
                            <div className="col-xl-4 col-lg-4 col-md-6">
                            <div className="single-place mb-30">
                                <div className="place-img">
                                    <img style={{minHeight:"320px"}}src={`./upload/rooms/${item1?.resortpayment?.image}`} alt=""/>
                                </div>
                                <div className="place-cap">
                                    <div className="place-cap-top">
                                      <h3 className="card-title" key={i}>{item1?.total}₹</h3>
                                      <h4 className="card-title" key={i}>{item1?.payment?.name}</h4>  
                                      <h4 className="card-title" key={i}>{item1?.payment?.phone}</h4>  
                                      <h5 className="card-title" key={i}> Resort Details:<br/>{item1?.resortpayment?.rname}<br/>{item1?.resortpayment?.place}</h5>
                                      {/* <h4 className="card-title" key={i}>No of Tourists:{item1?.packagepayment?.num}</h4> */}

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

export default AdminViewPaymentResort