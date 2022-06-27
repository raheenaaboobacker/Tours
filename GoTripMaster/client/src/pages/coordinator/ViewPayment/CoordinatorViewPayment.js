import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CoordinatorNav from '../../../Components/CoordinatorNav'
import Footer from '../../../Components/Footer'
import './viewPayment.css'
import { useNavigate } from 'react-router-dom'


function CoordinatorViewPayment() {
  const navigate=useNavigate()
  const [token,setToken]=useState(localStorage.getItem("token"))
  const [item,setItem]=useState([])
  const [itemFilter, setItemFilter] = useState([]);
  const id=localStorage.getItem("login_id")
  
  useEffect(()=>{
   
    // console.log("local storage id",id);
axios.get("http://localhost:5000/cordinator/getpackagepaymentdata").then(response=>{
           
            setItem(response.data.data)
           
            setItemFilter(item?.filter((filterdata) => {
              return filterdata?.packagedetails?.login_id===id
            }))
          
})
  },[])
  
const mapdata=item?.filter((filterdata) => {
  return filterdata?.packagedetails?.login_id===id
}).map(((item1,i)=>{
  return(<li class="table-row" style={{fontSize:15}}>
  
  <div class="col col-2" data-label="Customer Name">{item1?.payment?.name}</div>
  <div class="col col-2" data-label="Package Name">{item1?.packagedetails?.pname}</div>
  <div class="col col-2" data-label="Amount">{item1?.total}</div>
  <div class="col col-4" data-label="Payment Status">Paid</div>
</li>)}))


  return !token ? (
    navigate("/login")):(<div>
    <CoordinatorNav/>
    <div class="div2">
  <h2>Payment Details </h2>
  <ul class="responsive-table">
    <li class="table-header">
      
      <div class="col col-2">Customer Name</div>
      <div class="col col-2">Job Id</div>
      <div class="col col-2">Amount Due</div>
      <div class="col col-4">Payment Status</div>
    </li>
   {mapdata}
    
  </ul>
</div>
<Footer/>
</div>
  )
}

export default CoordinatorViewPayment