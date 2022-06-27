import React,{useState,useEffect} from 'react'
import { Button, Col,Row } from 'react-bootstrap'
import { useNavigate,Link } from 'react-router-dom'
import Footer from '../../Components/Footer'
import ResortNav from '../../Components/ResortNav'
import axios from "axios"
function Resort() {
    const navigate=useNavigate()
  const [token,setToken]=useState(localStorage.getItem("token"))
    const [item,setItem]=useState([])
    const [message,setMessage]=useState('')
      const id=localStorage.getItem("resort_Id")
    useEffect(()=>{
        if(!token){ 
            navigate("/login")
        }else{
      console.log(id);
      axios.get(`http://localhost:5000/resort/showresort/${id}`).then((response)=>{
    console.log(response);
    setItem(response.data.data)
})
        }
    },[message])
    const deleteitem=(id)=>{
        console.log("deleted id"+JSON.stringify(id))
        axios.delete(`http://localhost:5000/resort/deleteresort/${id}`)
        .then((response)=>{
           console.log(response.data.message)
           setMessage(response.data.message)
        })
    }
  return !token ? (
    navigate("/login")):(
    <div>
        <ResortNav/>
        <div className="slider-area ">
           
           <div className="single-slider slider-height2 d-flex align-items-center" style={{ backgroundImage: "url(" + "assets/img/hero/contact_hero.jpg" + ")"}} >
               <div className="container">
                   <div className="row">
                       <div className="col-xl-12">
                           <div className="hero-cap text-center">
                               <h2>Our Resort</h2>
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
                            <div className="col-xl-12 col-lg-12 col-md-12">
                            <div className="single-place mb-30">
                                <div className="place-img">
                                    <img style={{minHeight:"320px"}}src={`./upload/rooms/${u.image}`} alt=""/>
                                </div>
                                <div className="place-cap">
                                    <div className="place-cap-top">
                                       
                                        <h3><a href="#">{u.rname}</a></h3>
                                        <p className="dolor">₹{u.price} <span>/ Per Room</span></p>
                                        <p>{u.description}</p>
                                        <p>Rooms<span> :{u.rooms}</span></p>
                                    </div>
                                    <div className="place-cap-bottom">
                                        <ul>
                                            <li> 
                                            <Link to={`/updateresort/${u._id}`}>
                                            <Button variant="warning"  >
                                            Edit Resort Details
                                            </Button>
                                            </Link>
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
        <Col>
        </Col>
        <Col></Col>
      </Row>
     
            <Footer/>
      
          
</div>

  
  )
}

export default Resort