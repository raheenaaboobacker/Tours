import axios from 'axios'
import React, { useEffect, useState } from 'react'
import UserNav from '../../Components/UserNav'
import {Row,Col,Card,Stack,Button} from 'react-bootstrap'
import {IconButton ,Paper,InputBase} from '@mui/material'
import {Search,Menu} from "@mui/icons-material"
import {Link, useNavigate} from "react-router-dom"
import Footer from '../../Components/Footer'
import AboutCompnt from '../../Components/AboutCompnt'


function Userdashboard() {
   let [num, setNum]= useState(1);
   const [temp,setTemp]=useState([])
   const [token,setToken]=useState(localStorage.getItem("token"))
  const navigate=useNavigate()
  const [item,setItem]=useState([])
  const [searchitem,setSearchitem]=useState("")
  useEffect(()=>{
      
    if(!token){ 
      navigate("/login")
  }else{
      fetch('http://localhost:5000/user/getAllPackages', {
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
  }
    },[])

    let incNum =()=>{
      if(num<20)
      {
      setNum(Number(num)+1);
      }
    };
    let decNum = () => {
       if(num>1)
       {
        setNum(num - 1);
       }
    }
   let handleChange = (e)=>{
     setNum(e.target.value);
     console.log(num);
    }
    const handleClickOpen = (id) => {
      console.log(id);
      axios.get(`http://localhost:5000/user/singleitem/${id}`).then((response)=>{
        console.log("singledata"+JSON.stringify(response.data.data));
        setTemp(...response.data.data)
        console.log("singledata state"+JSON.stringify(temp))
      })
    };
    const addvalue=(e)=>{
      console.log(e.target.value);
      setSearchitem(e.target.value)
     console.log(item);
      }
      const buttonClick=(id,price,c_id,num,category_id)=>{
            console.log(c_id)
     console.log(num);
     localStorage.setItem("payment",true)
            navigate(`/userpaypackages/${id}/${price}/${c_id}/${num}/${category_id}`)
           
    }
    const toProceed=(id,price,c_id,category_id)=>{
      console.log(id)
      console.log(price)
      console.log(c_id)
      console.log(category_id)
      // navigate(`/userpaypackages/${id}/${price}/${c_id}/${num}/${category_id}`)
      navigate(`/userbookiternational/${id}/${price}/${c_id}/${category_id}`)
     
}
  return (
    <div>
        <UserNav/>
    <main>
    <div className="slider-area ">
               
                <div className="slider-active">
                    <div className="single-slider hero-overly  slider-height d-flex align-items-center" style={{ backgroundImage: "url(" + "assets/img/hero/h1_hero.jpg" + ")"}}  >
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-9 col-lg-9 col-md-9">
                                    <div className="hero__caption">
                                        <h1>Find your <span>Next tour!</span> </h1>
                                        <p>Where would you like to go?</p>
                                    </div>
                                </div>
                            </div>
                          
                            <div className="row">
                                <div className="col-xl-12">
                                   
                                    <form action="#" className="search-box">
                                        <div className="input-form mb-30">
                                            <input type="text" placeholder="Where Would you like to go ?" 
                                             onChange={addvalue} value={searchitem} name="name" required/>
                                        </div>
                                       
                                        <div className="search-form mb-60 xl-30 w-30">
                                            <a href="#places">Search</a>
                                        </div>	
                                    </form>	
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           
            <div class="favourite-place place-padding" id='places'>
                <div class="container">
                    
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="section-tittle text-center">
                                <h2>Favourite Places</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {item
                        .filter((filterdata)=>{
                            if(filterdata.pname.toLowerCase().includes(searchitem.toLowerCase())){
                              return filterdata
                            }
                          })
                        .map((u)=>(
                            <div className="col-xl-4 col-lg-4 col-md-6">
                            <div className="single-place mb-30">
                                <div className="place-img">
                                    <img style={{minHeight:"320px"}}src={`./upload/${u.image}`} alt=""/>
                                </div>
                                <div className="place-cap">
                                    <div className="place-cap-top">
                                       
                                        <h3>{u.pname}</h3>
                                        <p className="dolor">₹{u.price} <span>/ Per Person</span></p>
                                        {u.description}
                                    </div>
                                    <div className="col-xl-5">
                                       
                                    <button type="button" className="btn btn-primary" data-toggle="modal"   onClick={()=>{console.log("add"+u._id);handleClickOpen(u._id)}} data-target="#exampleModalCenter">
                                       Book Now
                                    </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        ))}
                        
                       
                       
                      
                    </div>
                </div>
            </div>
           
            <AboutCompnt/>
            </main>
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
  
    <div className="modal-body">
   
    <div className="place-cap">
     
              <div className="place-cap-top">
                  
                  <h3><a href="#">{temp.pname}</a></h3>
                  <p className="dolor">₹{temp.price} <span>/ Per Person</span></p>
                  {temp.description}
                 
              </div>
            
          </div>
       {temp.category_id==1?
        null:
        <Row className="justify-content-md-center">
        <Col xs lg="2"><div >
        <button  className="btn" type="button" onClick={decNum}>-</button>
       </div>
        </Col>
        <Col xs={8}>
        <input type="text" className="form-control" value={num} onChange={handleChange}/>
        </Col>
        <Col xs lg="2">
        <div >
       <button className="btn" type="button" onClick={incNum}>+</button>
       </div>
       </Col>
      </Row>}
      
    </div>
    <div className="modal-footer">
      <Button type="button" className="btn btn-secondary" data-dismiss="modal">Close</Button>
      {temp.category_id==1?
      <Button type="button" data-dismiss="modal" className="btn btn-secondary"
      aria-label="Close" onClick={()=>{toProceed(temp._id,temp.price,temp.login_id,temp.category_id)}} > Proceed</Button>:
      <Button type="button" data-dismiss="modal" className="btn btn-secondary" onClick={()=>{buttonClick(temp._id,temp.price,temp.login_id,num,temp.category_id)}} > Book Now</Button>}
    </div>
  
      
    </div>
  </div>
</div>

     
    </div>
  )
}

export default Userdashboard