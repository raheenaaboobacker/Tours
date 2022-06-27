import React, { useEffect, useState } from 'react'
import { useParams,useNavigate,useLocation } from 'react-router-dom'
import { Button, Row,Col } from 'react-bootstrap';
import { toast,ToastContainer } from 'react-toastify'

function UserPayInternationalPackage() {
    const [token,setToken]=useState(localStorage.getItem("token"))
    const [payment,setPayment]=useState(localStorage.getItem("payment"))
  var dateObj = new Date();
  var month = dateObj.getUTCMonth() + 1;
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();
  var newdate = year + "-0" + month + "-" + day;
  console.log(newdate);

  let total;
  let num;
  console.log(num);
 
  const navigate=useNavigate()
  const location = useLocation();
  console.log(location.state.bookdata);
  const [bookdata,setBookdata] = useState(location.state.bookdata);
  console.log(bookdata.PassengerDetails);
  num=bookdata.PassengerDetails.length
  console.log(num);

 const [temp,setTemp]=useState(0)
 const [contacts,setContacts]=useState({
  cardNo:"",
  Edate:"",
  cvv:'',
  cOwner:""
});
 useEffect(()=>{
    if(!payment){ 
        navigate("/userdashboard")
    }else{
    console.log(bookdata[0].price);
    console.log(num);
     total=num*bookdata[0].price
     console.log(total);
setTemp(total)
    }
 },[])
 const addContacts=(e)=>{
  e.preventDefault()
  var card = /^\(?([0-9]{12})$/;
  var checkcvv=/^\(?([0-9]{3})$/;
  if(!card.test(contacts.cardNo)){
    toast.warning("Please Enter valid card number!!",{autoClose:3000,theme:'light'})
  }else
  if(contacts.Edate===''){
    toast.warning("Please enter expiry date!!",{autoClose:3000,theme:'light'})

  }else  if(!checkcvv.test(contacts.cvv)){
    toast.warning("Please enter valid cvv!!",{autoClose:3000,theme:'light'})

  }else  if(contacts.cOwner===''){
    toast.warning("Please eneter card owner!!",{autoClose:3000,theme:'light'})

  }
  else {

 const params = {
  bookdata:bookdata,
     total:temp,
     num:num 
    
 
}
console.log(params);
  fetch('http://localhost:5000/user/payInternationalPackage', {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
          'Content-Type': 'application/json',
          'Authorization':'Bearer '+token,
      },
}).then(res => res.json())
.then(response=>{
  alert(response.message);
  localStorage.removeItem("payment")
  navigate('/userShowBookedPackage')
})
  }
  
}
const handleInputChange=(e)=>{
  const {name,value}=e.target
  setContacts({
      ...contacts,
      [name]:value
  })
 console.log(JSON.stringify(contacts));

}
  return !token ? (
    navigate("/login")): (
    <div class="container">

    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-md-6 col-md-offset-3" style={{paddingTop:100}}>
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <div class="row">
                            <h3 class="text-center">Payment Details</h3>
                            <img class="img-responsive cc-img" src="https://www.prepbootstrap.com/Content/images/shared/misc/creditcardicons.png"/>
                        </div>
                    </div>
                    <div class="panel-body">
                        <form onSubmit={addContacts}>
                            <div class="row">
                                <div class="col-xs-12">
                                    <div class="form-group">
                                        <label>CARD NUMBER</label>
                                        <div class="input-group">
                                            <input type="number" class="form-control" placeholder="Valid Card Number"
                                             name="cardNo"
                                             value={contacts.cardNo}
                                             onChange={handleInputChange} required />
                                            <span class="input-group-addon"><span class="fa fa-credit-card"></span></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-7 col-md-7">
                                    <div class="form-group">
                                        <label><span class="hidden-xs">EXPIRATION</span><span class="visible-xs-inline">EXP</span> DATE</label>
                                        <input type="date" min={newdate} class="form-control" placeholder="MM / YY" 
                                        name="Edate"
                                        value={contacts.Edate}
                                        onChange={handleInputChange} required />
                                    </div>
                                </div>
                                <div class="col-xs-5 col-md-5 pull-right">
                                    <div class="form-group">
                                        <label>CV CODE</label>
                                        <input type="number" class="form-control" placeholder="CVC" 
                                        name="cvv"
                                        value={contacts.cvv}
                                        onChange={handleInputChange} required />
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-12">
                                    <div class="form-group">
                                        <label>CARD OWNER</label>
                                        <input type="text" class="form-control" placeholder="Card Owner Names"
                                        name="cOwner"
                                        value={contacts.cOwner}
                                        onChange={handleInputChange} required />
                                    </div>
                                </div>
                            </div>
                            <div class="panel-footer">
                        <div class="row">
                            <div class="col-xs-12">
                                <button class="btn btn-warning btn-lg btn-block" > Pay ₹{temp}</button>
                            </div>
                        </div>
                    </div>
                        </form>
                    </div>
                   <ToastContainer/>
                </div>
            </div>
        </div>
    </div>
    
    </div>
    
  )
}

export default UserPayInternationalPackage