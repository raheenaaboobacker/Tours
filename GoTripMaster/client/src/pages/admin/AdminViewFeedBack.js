import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AdminNav from '../../Components/AdminNav'
import Footer from '../../Components/Footer'
import { useNavigate } from 'react-router-dom'

function AdminViewFeedBack() {
  const [ isHiddenList, setIsHiddenList ] = React.useState([])
const toggleHidden = key => () => {
  console.log(key);
  console.log(isHiddenList);
        setIsHiddenList(
            isHiddenList.includes(key)
                ? isHiddenList.filter(existingKey => existingKey !== key)   
                : [ ...isHiddenList, key ]
        );
};
  const [clamped, setClamped] = useState(true);
  const [showButton, setShowButton] = useState(true);
  const handleClick = message =>{ setClamped(!clamped);}
    const [item,setItem]=useState([])
    const navigate=useNavigate()
  const [token,setToken]=useState(localStorage.getItem("token"))

    useEffect(()=>{
        axios.get("http://localhost:5000/admin/viewFeedback").then(response=>{
            console.log((response));
            setItem(response.data.data)
            console.log(JSON.stringify(item));
})
  },[])
  const mapdata=item?.map((item1,i)=>{
    const isHidden = isHiddenList.includes(item1?.message);
    return(
      <tr>
        <td data-label="Name">{item1?.feedbackdata[0]?.name}</td>
        <td data-label="Email">{item1?.feedbackdata[0]?.email}</td>
        <td data-label="Contact no">{item1?.feedbackdata[0]?.phone}</td>
        <td data-label="Feed Back"key={i} > {item1?.message.length<28?<> {item1?.message}</>:<><div key={i} className={("long-text", clamped && "clamp")}> {item1?.message.slice(0,28)}
       
       {!isHidden ? null:<>{item1?.message.slice(28) }</>}{showButton && (
        <a   onClick={toggleHidden(item1?.message)}><h3>show {!isHidden?"more":"less"}</h3></a>
         )}
          
          </div></>}</td>
        
      </tr>
  //   <li class="table-row" style={{fontSize:15}}>
  //   <div class="col col-2" data-label="Customer Name">{item1?.feedbackdata[0]?.name}</div>
  //   <div class="col col-2" data-label="Email">{item1?.feedbackdata[0]?.email}</div>
  //   <div class="col col-2" data-label="Phone No">{item1?.feedbackdata[0]?.phone}</div>
  //   <div class="col col-4" data-label="Feed Back" key={i}>
  //     {item1?.message.length<32?<> {item1?.message}</>:<><div key={i} className={("long-text", clamped && "clamp")}> {item1?.message.slice(0,31)}
       
  //   {!isHidden ? null:<>{item1?.message.slice(31) }</>}{showButton && (
  //    <a   onClick={toggleHidden(item1?.message)}><h4>....</h4></a>
  //     )}
       
  //      </div></>}
  //      </div>
  // </li>
  )})
  return  !token ? (
    navigate("/login")): (
    <div >
        <AdminNav/>
        <div className='div2'>
        <h2>FeedBack </h2>
        <table>
        
  
        <thead >
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Contact No</th>
            <th scope="col">Feed Back</th>
          </tr>
        </thead>
        <tbody>
         {mapdata}
        </tbody>
          </table><br/><br/>
        {/* <ul class="responsive-table">
            <li class="table-header">
            <div class="col col-2">Customer Name</div>
            <div class="col col-2">Email</div>
            <div class="col col-2">Phone No</div>
            <div class="col col-4">FeedBack</div>
            </li>
        {mapdata}
        
        </ul> */}
        </div>
        <Footer/>
    </div>
  )
}

export default AdminViewFeedBack