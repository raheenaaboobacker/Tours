import axios from 'axios'
import React, { useEffect, useState } from 'react'
import UserNav from '../../Components/UserNav'
import {Row,Col,Card,Stack,Button} from 'react-bootstrap'
import {IconButton ,Paper,InputBase} from '@mui/material'
import {Search,Menu} from "@mui/icons-material"
import {Link, useNavigate} from "react-router-dom"
import Footer from '../../Components/Footer'
import AboutCompnt from '../../Components/AboutCompnt'
import { toast,ToastContainer } from 'react-toastify'

function Useviewresort() {
    const [token,setToken]=useState(localStorage.getItem("token"))
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1;
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    var newdate = year + "-0" + month + "-" + day;
    const navigate=useNavigate()
    const [bookdata,setBookdata]=useState({
        resort_id:"",
        price:"",
        checkin:"",
        checkout:"" ,
        rooms:"",
        count:"",
        children:""
    })
  const [item,setItem]=useState([])
  const [temp,setTemp]=useState([])
const [rooms,setRooms]=useState("1")
  useEffect(()=>{
    if(!token){ 
        navigate("/login")
    }else{
      fetch('http://localhost:5000/user/getAllResorts', {
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
const handleClickOpen = (id) => {
    console.log(id);
    axios.get(`http://localhost:5000/user/singleresort/${id}`).then((response)=>{
        console.log("singledata"+JSON.stringify(response.data.data));
        setTemp(...response.data.data)
        console.log("singledata state"+JSON.stringify(temp))
        setBookdata({
            ...bookdata,
            resort_id:response.data.data[0]._id,
            price:response.data.data[0].price
        })
        setRooms(response.data.data[0].rooms)
    console.log(rooms)
    })
    };
const buttonClick=(bookdata)=>{
    console.log(bookdata);
    if(bookdata.count==""){
        toast.warning("Please choose number of adults!!",{autoClose:3000,theme:'light'})

    }else if(bookdata.rooms==""){
        toast.warning("Please Choose no of  rooms!!",{autoClose:3000,theme:'light'})

    }else
    if(bookdata.checkin > bookdata.checkout){
        toast.warning("please check ckeckout date!!it must be after checkin date",{autoClose:3000,theme:'light'})
    }else{
        localStorage.setItem("payment",true)
    navigate("/userpayresort", { state: { bookdata } });
    }  
   
}
const handleInputChange=(e)=>{
    const {name,value}=e.target
    setBookdata({
        ...bookdata,
        [name]:value
    })
    console.log(bookdata);
}
const myExample = () => {
    let myArray = []
   
    for(let i = 1; i<=rooms;i++) {
        myArray.push( <option  >{i}</option>)
    }
    return myArray
} 

  return (
    <div>   <UserNav/>
    <main>
    <div className="slider-area ">
               
               <div className="slider-active">
                   <div className="single-slider hero-overly  slider-height d-flex align-items-center" style={{ backgroundImage: "url(" + "assets/img/hero/h1_hero.jpg" + ")"}}  >
                       <div className="container">
                           <div className="row">
                               <div className="col-xl-9 col-lg-9 col-md-9">
                                   <div className="hero__caption">
                                       <h1>Book your <span>Resort!</span> </h1>
                                       
                                   </div>
                               </div>
                           </div>
                         
                           <div className="row">
                               <div className="col-xl-12">
                                  
                                 	
                               </div>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
          
           
            <div class="favourite-place place-padding">
                <div class="container">
                    
            <div class="row">
                <div class="col-lg-12">
                    <div class="section-tittle text-center">
                        <span>FEATURED Roooms</span>
                        <h2>Resorts</h2>
                    </div>
                </div>
            </div>
            <div className="row">
                {item
                .map((u)=>(
                    <div className="col-xl-4 col-lg-4 col-md-6">
                    <div className="single-place mb-30">
                        <div className="place-img">
                            <img style={{minHeight:"320px"}}src={`./upload/rooms/${u.image}`} alt=""/>
                        </div>
                        <div className="place-cap">
                            <div className="place-cap-top">
                                
                                <h3>{u.rname}</h3>
                                <p className="dolor">₹{u.price} <span>/ For One Room</span></p>
                                {u.description}<br/>
                                {temp.rooms}&nbsp;Rooms<br/>
                                {temp.address},{temp.place},{temp.phone}
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
<div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLongTitle">Book Resort</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
      <div className="place-cap">
                <div className="place-cap-top">
                    
                    <h3>{temp.rname}</h3>
                    <p className="dolor">₹{temp.price} <span>/ Per Room</span></p>
                </div>
              
         </div>
         <div >  
             <div class="col-md-12 col-md-pull-0">
                    <div class="booking-form">
                        <form  >
                           
                            <div class="row">
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <span class="form-label">Check In</span>
                                        <input class="form-control" type="date"
                                          name="checkin"
                                          min={newdate}
                                          value={bookdata.checkin}
                                          onChange={handleInputChange}
                                           required/>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <span class="form-label">Check out</span>
                                        <input class="form-control" type="date" 
                                        name="checkout"
                                        min={newdate}
                                        value={bookdata.checkout}
                                        onChange={handleInputChange}
                                        required/>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-4">
                                    <div class="form-group">
                                        <span class="form-label">Rooms</span>
                                        <select class="form-control"name="rooms"
                                            value={bookdata.rooms}
                                            onChange={handleInputChange} required>
                                           <option hidden="" disabled="disabled" selected="selected" value="">Rooms</option>

                                            {myExample()}
                                        
                                        </select>
                                        <span class="select-arrow"></span>
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <div class="form-group">
                                        <span class="form-label">Count</span>
                                        <select class="form-control" required
                                        name="count"
                                        value={bookdata.count}
                                        onChange={handleInputChange} >
                                         <option hidden="" disabled="disabled" selected="selected" value="">adults</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                        <option>6</option>

                                        </select>
                                        <span class="select-arrow"></span>
                                      
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <div class="form-group">
                                        <span class="form-label">Count</span>
                                        <select class="form-control" required
                                        name="children"
                                        value={bookdata.children}
                                        onChange={handleInputChange} >
                                         <option hidden="" disabled="disabled" selected="selected" value="">childrens</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                        <option>6</option>

                                        </select>
                                        <span class="select-arrow"></span>
                                      
                                    </div>
                                </div>
                                 <ToastContainer/>
                            </div>
                            <br/>
                            <div class="row">
                        <div class="col-xs-12">
                      
                            <button class="btn btn-warning btn-lg btn-block" data-dismiss="modal"onClick={()=>{buttonClick(bookdata)}} >Book </button>
                          
                        </div>
                    </div>
                        </form>
                        </div>
                    </div>
                </div>
             </div>
     
         </div>
      </div>
</div>

            <Footer/></div>
  )
}

export default Useviewresort