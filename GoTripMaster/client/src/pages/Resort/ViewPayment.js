import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Footer from '../../Components/Footer'
import ResortNav from '../../Components/ResortNav'
import { useNavigate } from 'react-router-dom'


function ViewPayment() {
    const [item,setItem]=useState([])
    const id=localStorage.getItem("resort_Id")
    const navigate=useNavigate()
  const [token,setToken]=useState(localStorage.getItem("token"))
 
    useEffect(()=>{
      if(!token){ 
        navigate("/login")
    }else{
      console.log("local storage id",id);
  axios.get(`http://localhost:5000/resort/getresortpaymentdata/${id}`).then(response=>{
              console.log((response));
              setItem(response.data.data)
              console.log(JSON.stringify(item));
  })
}
    },[])
    
  const mapdata=item?.map(((item1,i)=>{
    return(<li class="table-row" style={{fontSize:15}}>
    <div class="col col-2" data-label="Customer Name">{item1?.payment?.name}</div>
    <div class="col col-2" data-label="Amount">{item1?.total}</div>
    <div class="col col-2" data-label="Phone No">{item1?.payment?.phone}</div>
    <div class="col col-4" data-label="Payment Status">Paid</div>
  </li>)}))
  return (
    <div>
        <ResortNav/>
        <div class="div2">
  <h2>Payment Details </h2>
  <ul class="responsive-table">
    <li class="table-header">
      <div class="col col-2">Customer Name</div>
      <div class="col col-2">Amount Due</div>
      <div class="col col-2">Phone No</div>
      <div class="col col-4">Payment Status</div>
    </li>
   {mapdata}
   
  </ul>
</div>
<Footer/>
    </div>
  )
}

export default ViewPayment