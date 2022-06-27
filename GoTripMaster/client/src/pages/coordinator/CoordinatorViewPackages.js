import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CoordinatorNav from '../../Components/CoordinatorNav'
import {Row,Col,Button} from 'react-bootstrap'
import { Link,useNavigate } from 'react-router-dom'
import Footer from '../../Components/Footer'

function CoordinatorViewPackages() {
    const [item,setItem]=useState([])
    const [message,setMessage]=useState('')
    const navigate=useNavigate()
    const [token,setToken]=useState(localStorage.getItem("token"))
  
    useEffect(()=>{
    
      console.log(token);
      fetch('http://localhost:5000/cordinator/showpackage', {
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
    },[message])
    const deleteitem=(id)=>{
        console.log("deleted id"+JSON.stringify(id))
        axios.delete(`http://localhost:5000/cordinator/deletePackage/${id}`)
        .then((response)=>{
           console.log(response.data.message)
           setMessage(response.data.message)
        })
    }
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
                               <h2>Our Packages</h2>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
       </div>
       <div className="favourite-place place-padding">
                <div className="container">
                    
                    <div className="row">
                        {item
                        .map((u)=>(
                            <div className="col-xl-4 col-lg-4 col-md-6">
                            <div className="single-place mb-30">
                                <div className="place-img">
                                    <img style={{minHeight:"350px"}}src={`./upload/${u.image}`} alt=""/>
                                </div>
                                <div className="place-cap">
                                    <div className="place-cap-top">
                                       
                                        <h3><a href="#">{u.pname}</a></h3>{u.category_id==1?<span>International Package</span>:null}
                                        <p className="dolor">₹{u.price} <span>/ Per Person</span></p>
                                        <p>{u.description}</p>
                                    </div>
                                    <div className="place-cap-bottom">
                                        <ul>
                                            <li> 
                                            <Link to={`/coordinatorupdatepackage/${u._id}`}>
                                              <Button  variant="secondary"  >
                                                  Edit
                                              </Button>
                                            </Link>
                                            </li>
                                            <li> 
                                              <Button style={{marginLeft:"20px",width:"110px"}} variant="secondary" type='submit' onClick={()=>{deleteitem(u._id)}}  >
                                                Delete
                                               </Button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        ))}
                      
                    </div>
                </div>
            </div>
            
      <Row>
        <Col></Col>
        <Col><Link to={'/coordinatoraddpackage'}>
      <Button style={{ marginTop:"-100px"}} variant="warning"  >
       Add Packages
      </Button>
      </Link></Col>
        <Col></Col>
      </Row>
     
            <Footer/>
      
          </div>
  )
}

export default CoordinatorViewPackages