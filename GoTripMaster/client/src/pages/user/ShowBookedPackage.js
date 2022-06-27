import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Footer from '../../Components/Footer';
import UserNav from '../../Components/UserNav'
import { useNavigate } from 'react-router-dom'

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
        <div className="favourite-place place-padding">
                <div className="container">
                    
                    <div className="row"style={{marginTop:-60}}>
                        <div className="col-lg-12">
                            <div class="section-tittle text-center">
                                <h2>Booked Package</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {item
                        
                        .map((u)=>(
                            <div className="col-xl-4 col-lg-4 col-md-6">
                            <div className="single-place mb-30">
                                <div className="place-img">
                                <img style={{minHeight:"320px"}}src={`./upload/${u?.bookedData[0]?.image}`} alt=""/>
                                </div>
                                <div className="place-cap">
                                    <div className="place-cap-top">
                                    <h3>{u?.bookedData[0]?.pname}</h3>
                                    <p className="dolor">{u.num} <span> Person</span></p>
                                    <p className="dolor">₹{u.num*u?.bookedData[0]?.price} </p>
                                    <h4>{u?.bookedData[0]?.description}</h4>

                                    </div>
                                    <div className="col-xl-5">
                                      {u?.bookedData[0]?.category_id==1?<button type="button" className="btn btn-primary" data-target="#exampleModalCenter" data-toggle="modal"
                                       onClick={()=>{ setPassenger(u)}} >View Passengers</button>:null}
                                      <button type="button" className="btn btn-primary" style={{marginLeft:10}}  onClick={()=>{handleClickOpen(u._id)}}>
                                         Cancel
                                      </button>   
                                      </div>
                                </div>
                               
                            </div>
                        </div>
                        ))}
                    
                      
                    </div>
                </div>
            </div>
       <Footer/>
       <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div className=" modal-dialog modal-dialog-centered" role="document">
    <div className="modal-content">
    <div className="modal-header">
      <h5 className="modal-title" id="exampleModalLongTitle">Book Package</h5>
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
                   <div className='passengerDetails' style={{backgroundColor: "#99a1a7",marginTop:20,padding:10}}>
                    <p style={{color:'rgba(1,75,133,0.8)'}}>Passenger Name : {data.p_name}</p>
                    <h5>Adhar No : {data.adhar_no}</h5>
                    <h5>Passport Number : {data.passport_no}</h5>
                    <h5>Expairy Date : {data.e_date}</h5>
                   
                    </div>
                  ))}
                  </>}
                
                  
              </div>
            
          </div>
     
      
    </div>
    <div className="modal-footer">
      <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
      </div>
  </div>
</div>

     
    </div>
  )
}

export default ShowBookedPackage