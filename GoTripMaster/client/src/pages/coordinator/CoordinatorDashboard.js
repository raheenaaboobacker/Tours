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
    const [passenger,setPassenger]=useState(null)
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
  
 const filterdata=item.filter((filterdata) => {
    return filterdata.packagedata[0].login_id.includes(tokenId)
  })
  return !token ? (
    navigate("/login")):(
    <div>
      <CoordinatorNav/>
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
                        <div className="col-lg-12">
                            <div className="section-tittle text-center">
                               
                                <h2>BOOKED PACKAGES</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {filterdata.length>0?(
                        filterdata.map((u)=>(
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
                                        {u.category_id==1?< Button style={{padding:10,width:"115px"}} variant="warning" type="button" data-target="#exampleModalCenter" data-toggle="modal"
                                       onClick={()=>{ setPassenger(u)}}   >View Passengers</Button>:null}

                                    </div>
                                </div>
                            </div>
                        </div>
                        ))): <div style={{width:"600px", margin:"auto"}}><div style={{textAlign:"center",fontSize:20}}  className="alert alert-warning" role="alert">
                        No Request Found!
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
                <h3><a href="#">{passenger?.packagedata[0]?.pname}</a></h3>
                  <p className="dolor">₹{passenger?.packagedata[0]?.price} <span>/ Per Person</span></p>
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

export default CoordinatorDashboard