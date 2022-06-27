import React,{useEffect,useState} from 'react'
import HomeNav from '../Components/HomeNav'
import {axios} from 'axios'
import Footer from '../Components/Footer'
import About from './About'
import AboutCompnt from '../Components/AboutCompnt'

 
function Home() {
    const [item,setItem]=useState([])
    const [resort,setResort]=useState([])
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
  fetch('http://localhost:5000/user/getAllResorts', {
    method: 'GET'
}).then(res => res.json())
.then((response)=>{
    console.log(response.data);
    setResort(response.data)
    console.log(resort);
  })
      },[])
      const addvalue=(e)=>{
        console.log(e.target.value);
        setSearchitem(e.target.value)
       console.log(item);
        }
        const showAlert=()=>{
            alert("Please login")
        }
  return (
      <div>
          <HomeNav/>
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
                                       
                                        <div className="search-form mb-30">
                                            <a href="#packages">Search</a>
                                        </div>	
                                    </form>	
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
                                
                                <h2 className='head1' style={{fontSize:40,fontFamily:"italic",color:"#014b85"}}>FEATURED TOURS PACKAGES</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row" id='packages'>
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
                                <a  onClick={showAlert}>
                                    <img style={{minHeight:"345px"}}src={`./upload/${u.image}`} alt=""/>
                                </a>
                                </div>
                                <div className="place-cap">
                                    <div className="place-cap-top">
                                        <span><i className="fas fa-star"></i><span>8.0 Superb</span> </span>
                                        <h3><a  onClick={showAlert}>{u.pname}</a></h3>
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
            <div className="favourite-place place-padding" style={{marginTop:-200}}>
                <div className="container">
                    
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-tittle text-center">
                                
                                <h2 className='head1' style={{fontSize:40,fontFamily:"italic",color:"#014b85"}}>BEST RESORTS</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {resort
                        .filter((filterdata)=>{
                            if(filterdata.place.toLowerCase().includes(searchitem.toLowerCase())){
                              return filterdata
                            }
                          })
                        .map((u)=>(
                            <div className="col-xl-4 col-lg-4 col-md-6">
                            <div className="single-place mb-30">
                                <div className="place-img">
                                <a  onClick={showAlert}>
                                    <img style={{minHeight:"320px"}}src={`./upload/rooms/${u.image}`} alt=""/>
                                </a>
                                </div>
                                <div className="place-cap">
                                    <div className="place-cap-top">
                                        <span><i className="fas fa-star"></i><span>8.0 Superb</span> </span>
                                        <h3><a  onClick={showAlert}>{u.rname}</a></h3>
                                        <p className="dolor">₹{u.price} <span>/ Per Rooms</span></p>
                                   <h4>{u.place}</h4>
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
            <div className="video-area video-bg pt-200 pb-200"  style={{ backgroundImage: "url(" + "assets/img/service/video-bg.jpg" + ")"}}  >
            <div className="container">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="video-caption text-center">
                            <div className="video-icon">
                                <a className="popup-video" href="https://www.youtube.com/watch?v=1aP-TXUpNoU" tabindex="0"><i className="fas fa-play"></i></a>
                            </div>
                            <p className="pera1">Love where you're going in the perfect time</p>
                            <p className="pera2">Tripo is a World Leading Online</p>
                            <p className="pera3"> Tour Booking Platform</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       <AboutCompnt/>
            <div className="our-services servic-padding">
                <div className="container">
                    <div className="row d-flex justify-contnet-center">
                        <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6">
                            <div className="single-services text-center mb-30">
                                <div className="services-ion">
                                    <span className="flaticon-tour"></span>
                                </div>
                                <div className="services-cap">
                                    <h5>8000+ Our Local<br/>Guides</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6">
                            <div className="single-services text-center mb-30">
                                <div className="services-ion">
                                    <span className="flaticon-pay"></span>
                                </div>
                                <div className="services-cap">
                                    <h5>100% Trusted Tour<br/>Agency</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6">
                            <div className="single-services text-center mb-30">
                                <div className="services-ion">
                                    <span className="flaticon-experience"></span>
                                </div>
                                <div className="services-cap">
                                    <h5>28+ Years of Travel<br/>Experience</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6">
                            <div className="single-services text-center mb-30">
                                <div className="services-ion">
                                    <span className="flaticon-good"></span>
                                </div>
                                <div className="services-cap">
                                    <h5>98% Our Travelers<br/>are Happy</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </main>
            <Footer/>
            </div>
  )
}

export default Home