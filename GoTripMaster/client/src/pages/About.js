import React from 'react'
import AboutCompnt from '../Components/AboutCompnt'
import Footer from '../Components/Footer'
import HomeNav from '../Components/HomeNav'

function About() {
  return (
     <main>
<HomeNav/>

   
    <div className="slider-area ">
       
        <div className="single-slider slider-height2 d-flex align-items-center" style={{ backgroundImage: "url(" + "assets/img/hero/h1_hero.jpg" + ")"}}>
            <div className="container">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="hero-cap text-center">
                            <h2>About Us</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  
   <AboutCompnt/>
    
      
   
  <Footer/>
</main>
  )
}

export default About