import React,{useEffect,useState} from 'react'
import HomeNav from '../Components/HomeNav'
import {axios} from 'axios'
import Footer from '../Components/Footer'

function Packages() {
    const [item,setItem]=useState([])
    const [searchitem,setSearchitem]=useState("")
    useEffect(()=>{
        fetch('http://localhost:5000/user/getAllPackages', {
        method: 'GET',
       
}).then(res => res.json())
  .then((response)=>{
    console.log(response.data);
    setItem(response.data)
    console.log(item);
  })
      },[])
  return (
    <div>
        <HomeNav/>
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
                        <div className="col-lg-12">
                            <div className="section-tittle text-center">
                                <span>FEATURED TOURS Packages</span>
                                <h2>Favourite Places</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {item
                        .map((u)=>(
                            <div className="col-xl-4 col-lg-4 col-md-6">
                            <div className="single-place mb-30">
                                <div className="place-img">
                                    <img style={{minHeight:"320px"}}src={`./upload/${u.image}`} alt=""/>
                                </div>
                                <div className="place-cap">
                                    <div className="place-cap-top">
                                        <span><i className="fas fa-star"></i><span>8.0 Superb</span> </span>
                                        <h3><a href="#">{u.pname}</a></h3>
                                        <p className="dolor">₹{u.price} <span>/ Per Person</span></p>
                                    </div>
                                    <div className="place-cap-bottom">
                                        <ul>
                                            <li> {u.description}</li>
                                         
                                        </ul>
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

export default Packages