import React, { useEffect, useState } from 'react'
import AdminNav from '../../Components/AdminNav'
import Footer from '../../Components/Footer'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'

function AdminViewPackageBooking() {
    const [item,setItem]=useState([])
    const [token,setToken]=useState(localStorage.getItem("token"))
    const [passenger,setPassenger]=useState(null)
    const navigate=useNavigate()
     
   
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
  
 
    return!token ? (
        navigate("/login")):(
        <div>
          <AdminNav/>
          <div className="slider-area ">
               
               <div className="single-slider slider-height2 d-flex align-items-center" style={{ backgroundImage: "url(" + "assets/img/hero/h1_hero.jpg" + ")"}} >
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
                            {item.map((u)=>(
                                <div className="col-xl-4 col-lg-4 col-md-6">
                                <div className="single-place mb-30">
                                    <div className="place-img">
                                        <img style={{minHeight:"345px"}}src={`./upload/${u.packagedata[0].image}`} alt=""/>
                                    </div>
                                    <div className="place-cap">
                                        <div className="place-cap-top">
                                           
                                        <h3>{u.packagedata[0].pname}<span style={{paddingLeft:25}}>{u.category_id===1?<><img style={{width:35,height:35}} src='https://i.pinimg.com/564x/12/8c/d6/128cd630c3fdc4c6d9dea5ca5c6624d7.jpg'/></>:null}</span></h3>
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
                                        {u.category_id==1?<Button type="button"  className="btn btn-secondary" data-target="#exampleModalCenter" data-toggle="modal"
                                       onClick={()=>{ setPassenger(u)}} >Passengers Details</Button>:null}

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
      <h5 className="modal-title" id="exampleModalLongTitle">Passenger Details</h5>
      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  
    <div className="modal-body" 
    style={{  height: "28vh",
    overflowY: "auto"}}
    >
   
    <div className="place-cap">
     
              <div className="place-cap-top">{passenger==null?null:<>
              
                {/* <h3><a href="#">{passenger?.bookedData[0]?.pname}</a></h3>
                  <p className="dolor">₹{passenger?.bookedData[0]?.price} <span>/ Per Person</span></p>
                  <h5>Passengers Details</h5> */}
             

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

export default AdminViewPackageBooking