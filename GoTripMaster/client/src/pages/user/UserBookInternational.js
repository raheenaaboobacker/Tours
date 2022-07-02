import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toast,ToastContainer } from 'react-toastify'
import "./userbookinternational.css"

function UserBookInternational() {
  const navigate = useNavigate();
  const { id, price, c_id, category_id } = useParams()
  const [token,setToken]=useState(localStorage.getItem("token"))

  
  const [bookdata,setBookdata]=useState([{
    category_id :category_id ,
    package_id: id,
    c_id:c_id,
    price: price,
   
   
  }])

  const [contacts, setContacts] = useState([{
    p_name:"",
    adhar_no:null,
    passport_no:null,
    e_date:""

  }]);

  const[error,setError]=useState(false)
  const[erradhar,setErroradhar]=useState(false);
	const[errpassport,setErrpassport]=useState(false);
	

  var dateObj = new Date();
  var month = dateObj.getUTCMonth() + 1;
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();
  var newdate = year + "-0" + month + "-" + day;

  const handleAddPlayers = () => {
    const values = [...contacts];
    values.push({
      p_name:"",
      adhar_no: null,
      passport_no:null ,
      e_date: "",
    });
    setContacts(values)
    
  };

  const handleRemovePlayers = (index) => {
    const values = [...contacts];
    values.splice(index, 1);
    setContacts(values);
  };

  const handleInputChange = (index, event) => {
    const values = [...contacts];
    const updatedValue = event.target.name;
    values[index][updatedValue] = event.target.value;

    setContacts(values);
    const Passenger = [...contacts];
  setBookdata(prevState => {
    return {...prevState, PassengerDetails:[ ...Passenger] }
  });
 
  };

  console.log(contacts);

const submitForm=(e)=>{
  e.preventDefault();
  setError(false)
  setErroradhar(false)
  setErrpassport(false)
 console.log(contacts[0]);
    var card = /^\(?([0-9]{12})$/;
   
    if(contacts[0].p_name===""||contacts[0].adhar_no===''||contacts[0].e_date===''||contacts[0].passport_no===''){
      setError(true)
    }else
    if(!card.test(contacts[0].adhar_no)){
    setErroradhar(true)
    }
   else  if(!card.test(contacts[0].passport_no)){
      setErrpassport(true)
    }
    

 else{
  
  console.log(contacts);
    const Passenger = [...contacts];
  setBookdata(prevState => {
    return {...prevState, PassengerDetails:[ ...Passenger] }
  });
  console.log(bookdata);
localStorage.setItem("payment",true)
  navigate("/userpayinternationalpackage", { state: { bookdata } });


}
}

 
  return !token ? (
    navigate("/login")):(
    <div className="div1">
      <div id="booking" class="section">
        <div class="section-center">
          <div class="container">
            <div class="row">
              <div class="booking-form">
                <form action="" >
                <div class="row">
                <div class="col-md-6"></div>
                <div class="col-md-6">
                <Button style={{padding:10,width:"110px"}} variant="warning" onClick={() => handleAddPlayers()}>
                ADD PASSENGERS
               </Button></div>
                  </div>
                <br/><br/>
                {contacts.length > 0 && (
                <>
                  {contacts.map((field, index) => (<>
                    <h4 style={{ color: "wheat" }}>Passenger{index+1} </h4>
                    {error===true?<label style={{color:"red",marginLeft:"100px"}}>please fill all field</label>:null }

                 <div class="row">
                 <div class="col-md-6">
                

                   <div class="form-group"> <input class="form-control" type="string" name="p_name"
                      placeholder="Enter Passenger Name" value={contacts.p_name}
                      onChange={(event) =>
                        handleInputChange(index, event)} required/>

                     </div>
                     <div class="form-group"> <input class="form-control" type="number" name="passport_no"
                      placeholder="Enter passport number" value={contacts.passport_no}
                      onChange={(event) =>
                        handleInputChange(index, event)}
                       required />
                       {errpassport===true?<label style={{color:"red"}}>Enter valid Passport Number </label>:null }

                   </div>
                 </div>
                 <div class="col-md-6">
                 {erradhar===true?<label style={{color:"red"}}>Enter valid Adhar Number</label>:null }

                 <div class="form-group"> <input class="form-control" type="number" name="adhar_no"
                      placeholder="Enter Adhar Number" value={contacts.adhar_no}
                      onChange={(event) =>
                        handleInputChange(index, event)} required/>

                     </div>
                   <input type="date" min={newdate} class="form-control" placeholder="expairt date"
                     name="e_date" value={contacts.e_date}
                     onChange={(event) =>
                       handleInputChange(index, event)}
                      required />
                   <span style={{marginLeft:"20px",color:"white" ,paddingTop:"-5px"}}>Expairt date of Passport</span>
<br/>
                   <br />
         
                   
                   <Button style={{padding:10,width:"110px"}} variant="warning"
                          onClick={() => handleRemovePlayers(index)}
                        >
                          Cancel
                        </Button><br/><br/>
                 </div>
             
               </div>
                </>  ))}</>)}
                 
              
               
               <div >
               <Button className="submit-btn" type="submit" onClick={submitForm}>
                book now
               </Button>                  </div>
                </form>

              </div>

            </div>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default UserBookInternational