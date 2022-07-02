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
           
           <div className="single-slider slider-height2 d-flex align-items-center" style={{ backgroundImage: "url(" + "assets/img/hero/h1_hero.jpg" + ")"}} >
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
       
       <Row>
        <Col></Col>
        <Col><Link to={'/coordinatoraddpackage'}>
        <div style={{padding:"100px 100px 0 100px"}}>  <button type='button' className="button button-contactForm boxed-btn"  >
       Add Packages
      </button></div>
      </Link></Col>
        <Col></Col>
      </Row>
      
       <div className="favourite-place place-padding" style={{paddingTop: "100px"}} > 
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
                                       
                                    <h3>{u.pname}<span style={{paddingLeft:25}}>{u.category_id===1?<><img style={{width:35,height:35}} src='https://i.pinimg.com/564x/12/8c/d6/128cd630c3fdc4c6d9dea5ca5c6624d7.jpg'/></>:null}</span></h3>
                                        <p className="dolor">₹{u.price} <span>/ Per Person</span></p>
                                        {u.description}
                                    </div>
                                    <div className="place-cap-bottom">
                                         
                                            <Link to={`/coordinatorupdatepackage/${u._id}`}>
                                              <Button style={{padding:10,width:"110px"}} variant="warning"  >
                                                  Edit
                                              </Button>
                                            </Link>
                                          
                                              <Button style={{padding:10,width:"110px",marginLeft:10}} variant="warning" type='submit' onClick={()=>{deleteitem(u._id)}}  >
                                                Delete
                                               </Button>
                                           
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

export default CoordinatorViewPackages