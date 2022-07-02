import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Footer from '../../Components/Footer';
import UserNav from '../../Components/UserNav'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap';

function ShowBookedPackage() {
    const [item,setItem]=useState([]);
    const [message,setMessage]=useState([])
    const [passenger,setPassenger]=useState(null)
    const navigate=useNavigate()
  const [token,setToken]=useState(localStorage.getItem("token"))
    const id=localStorage.getItem("login_id")
    console.log(id);
    useEffect(()=>{
        if(!token){ 
            navigate("/login")
        }else{
axios.get(`http://localhost:5000/user/BookedPackage/${id}`)
.then((response)=>{
    console.log(response.data);
    setItem(response.data.message)
})
        }
    },[message])
  
const handleClickOpen=(id)=>{
    console.log(id);
    axios.delete(`http://localhost:5000/user/deleteBookedPackage/${id}`)
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
                               <h2>Booked Packages</h2>
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
                                <img style={{minHeight:"345px"}}src={`./upload/${u?.bookedData[0]?.image}`} alt=""/>
                                </div>
                                <div className="place-cap"  style={{maxHeight:"320px"}}>
                                    <div className="place-cap-top">
                                    <h3>{u?.bookedData[0]?.pname}<span style={{paddingLeft:25,marginTop:-12}}>{u.category_id===1?<><img style={{width:35,height:35}} src='https://i.pinimg.com/564x/12/8c/d6/128cd630c3fdc4c6d9dea5ca5c6624d7.jpg'/></>:null}</span></h3>
                                    <p className="dolor">{u.num} <span> Person</span></p>
                                    <p className="dolor">₹{u.num*u?.bookedData[0]?.price} </p>
                                    <h4>{u?.bookedData[0]?.description}</h4>

                                    </div>
                                    <div className="col-xl-5">
                                      {u?.bookedData[0]?.category_id==1?<Button style={{padding:10,width:"110px"}} variant="warning" data-target="#exampleModalCenter" data-toggle="modal"
                                       onClick={()=>{ setPassenger(u)}} >View Passengers</Button>:null}<br/><br/>
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
       <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div className=" modal-dialog modal-dialog-centered" role="document">
    <div className="modal-content">
    <div className="modal-header">
      <h5 className="modal-title" id="exampleModalLongTitle">Booked Package</h5>
      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  
    <div className="modal-body" 
    style={{  height: "43vh",
    overflowY: "auto"}}
    >
  
    <div className="place-cap">
     
              <div className="place-cap-top">{passenger==null?null:<>
                <h3><a href="#">{passenger?.bookedData[0]?.pname}</a></h3>
                  <p className="dolor">₹{passenger?.bookedData[0]?.price} <span>/ Per Person</span></p>
                  <h5>Passengers Details</h5>
             

                  {passenger?.PassengerDetails?.map((data,i)=>(
                     <div class="row" style={{marginTop:10}}>
                     <div class="col-sm-10">
                       <div class="card">
                         <div class="card-body">
                         <h5 class="card-title">Passenger {i+1}</h5>
                          <p class="card-text">
                          Passenger Name : {data.p_name}<br/>Adhar No : {data.adhar_no}<br/>
                          Passport Number : {data.passport_no}<br/>
                          Expairy Date : {data.e_date}</p>
                        </div>
                       </div>
                     </div>
                     </div>
                
                  ))}
                  </>}
                
                  
              </div>
            
          </div>
     
      
    </div>
    <div className="modal-footer">
    <Button style={{padding:10,width:"110px"}} variant="warning" data-dismiss="modal">Close</Button>
      </div>
      </div>
  </div>
</div>

     
    </div>
  )
}

export default ShowBookedPackage