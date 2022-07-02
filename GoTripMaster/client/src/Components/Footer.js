import React from 'react'

function Footer() {
  return (
    <footer>
      
        <div className="footer-area footer-padding footer-bg" style={{ backgroundImage: "url(" + "assets/img/service/footer_bg.jpg" + ")"}}>
            <div className="container">
                <div className="row d-flex justify-content-between">
                    <div className="col-xl-3 col-lg-3 col-md-5 col-sm-6">
                       <div className="single-footer-caption mb-50">
                         <div className="single-footer-caption mb-30">
                             
                             <div className="footer-logo">
                                 <a href="/"><img src="assets/img/logo/logo2_footer.png" alt=""/></a>
                             </div>
                             <div className="footer-tittle">
                                 <div className="footer-pera">
                                     <p>A team of professional traval Experts. Trust Our Experience. Let us plan you a perfect  Holiday.Find your Next tour!</p>
                                </div>
                             </div>
                         </div>
                       </div>
                    </div>
                    <div className="col-xl-2 col-lg-3 col-md-3 col-sm-5">
                        <div className="single-footer-caption mb-50">
                            <div className="footer-tittle">
                                <h4>Quick Links</h4>
                                <ul>
                                    <li><a href="javascript:void(0)">About</a></li>
                                    <li><a href="javascript:void(0)"> Offers & Discounts</a></li>
                                    <li><a href="javascript:void(0)"> Get Coupon</a></li>
                                    <li><a href="javascript:void(0)">  Contact Us</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-7">
                        <div className="single-footer-caption mb-50">
                            <div className="footer-tittle">
                                <h4>Nature</h4>
                                <ul>
                                    <li><a href="javascript:void(0)">Hills</a></li>
                                    <li><a href="javascript:void(0)">Backwaters</a></li>
                                    <li><a href="javascript:void(0)">Waterfalls</a></li>
                                    <li><a href="javascript:void(0)">Wildlife</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-5 col-sm-7">
                        <div className="single-footer-caption mb-50">
                            <div className="footer-tittle">
                                <h4>Support</h4>
                                <ul>
                                 <li><a href="javascript:void(0)">Frequently Asked Questions</a></li>
                                 <li><a href="javascript:void(0)">Terms & Conditions</a></li>
                                 <li><a href="javascript:void(0)">Privacy Policy</a></li>
                                 <li><a href="javascript:void(0)">Privacy Policy</a></li>
                                 <li><a href="javascript:void(0)">Report a Payment Issue</a></li>
                             </ul>
                            </div>
                        </div>
                    </div>
                </div>
               
                <div className="row pt-padding">
                 <div className="col-xl-7 col-lg-7 col-md-7">
                    <div className="footer-copy-right">
                         <p>
  Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved 
</p>
                    </div>
                 </div>
                  <div className="col-xl-5 col-lg-5 col-md-5">
                       
                        <div className="footer-social f-right">
                            <a href="javascript:void(0)"><i className="fab fa-twitter"></i></a>
                            <a href="javascript:void(0)"><i className="fab fa-facebook-f"></i></a>
                            <a href="javascript:void(0)"><i className="fab fa-behance"></i></a>
                            <a href="javascript:void(0)"><i className="fas fa-globe"></i></a>
                        </div>
                 </div>
             </div>
            </div>
        </div>
        </footer>
  )
}

export default Footer