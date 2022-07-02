import axios from 'axios'
import React, { useEffect,useState } from 'react'
import {Row,Col,Card,Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Footer from '../../Components/Footer'
import AdminNav from '../../Components/AdminNav'
import { useNavigate } from 'react-router-dom'

function Adminmanageresort() {
    const [users,setUsers]=useState([])
    const [message,setMessage]=useState([])
    const navigate=useNavigate()
  const [token,setToken]=useState(localStorage.getItem("token"))

    useEffect(()=>{
axios.get("http://localhost:5000/admin/getresortdatas")
.then((response)=>{
    console.log(response.data.data);
    if(response.data.success==true)
    {
        setUsers(response.data.data)
    }
    console.log("userdata",JSON.stringify(users));
}).catch((error) => {
  console.log(error);
 
});
    },[message])

    const ApproveUser=(id)=>{
      console.log(id);
      axios.post(`http://localhost:5000/admin/approveusers/${id}`)
      .then((response)=>{
        if(response.data.success==true)
         {
           setMessage(response.data.message)
         
           alert(response.data.message)
         
        }
       })
    }
  const  Deleteresortowner=(id)=>{
      console.log("resort id",id)

      const url="http://localhost:5000/admin/resortdelete/"+id
      console.log("url",url)
 
      axios.delete(url)
      .then((response)=> {
      console.log("DELETE RESORT======",response);

      if(response.data.success==true)
      {
        setMessage(response.data.message)

          alert(response.data.message)
         
      }


     })
     .catch((error) => {
       console.log(error);
      
     });
   }
  return !token ? (
    navigate("/login")): (
    <div>
    <AdminNav/>
    <div className="slider-area ">
           
           <div className="single-slider slider-height2 d-flex align-items-center" style={{ backgroundImage: "url(" + "assets/img/hero/h1_hero.jpg" + ")"}} >
               <div className="container">
                   <div className="row">
                       <div className="col-xl-12">
                           <div className="hero-cap text-center">
                               <h2>Resorts</h2>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
       </div>
       <div className="favourite-place place-padding">
                <div className="container">
                    
                 
                    <div className="row">
                        {users
                        .map((item,i)=>(
                            <div className="col-xl-4 col-lg-4 col-md-6">
                            <div className="single-place mb-30">
                            <div className="place-img">
                                    <img style={{minHeight:"300px"}}  key={i} src={`./upload/rooms/${item.registerdetails[0].image}`} alt=""/>
                                </div>
                                <div className="place-cap">
                                    <div className="place-cap-top">
                                       
                                    <h4 className="card-title" key={i}>ResortName :{item.registerdetails[0].rname} </h4>
                                    <h5 className="card-title" key={i}>Owner Name : {item.registerdetails[0].name}</h5>
                                    <h5 className="card-title" key={i}>Contact : {item.registerdetails[0].phone}</h5>
                                    <h5 className="card-text" key={i}>email : {item.registerdetails[0].email}</h5>
                                    <h5 className="card-title" key={i}>Address :{item.registerdetails[0].address} </h5>
                                    <h5 className="card-title" key={i}>Description :{item.registerdetails[0].description} </h5>

                                    <h5 className="card-text" key={i}>Price : {item.registerdetails[0].price}</h5>
                                    <h5 className="card-text" key={i}>Rooms : {item.registerdetails[0].rooms}</h5>
                                   
                                    </div>
                                    <div className="place-cap-bottom">
                                        
                                    <Button variant="warning" style={{padding:10,width:"110px"}} onClick={()=>Deleteresortowner(item._id)} >Delete</Button> 
                                            
                                            {item.status===0?
                                              <> <Button variant="warning" style={{padding:10,width:"110px" ,marginLeft:5}}  onClick={()=>ApproveUser(item._id)} class="btn" >
                                                          Approve</Button></>:
                                              null} 
                                           
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

export default Adminmanageresort