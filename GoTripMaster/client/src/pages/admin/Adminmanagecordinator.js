import axios from 'axios'
import React, { useEffect,useState } from 'react'
import {Row,Col,Card,Button} from 'react-bootstrap'
import { Link,useNavigate } from 'react-router-dom'
import Footer from '../../Components/Footer'
import AdminNav from '../../Components/AdminNav'
import PersonIcon from '@mui/icons-material/Person';



function Adminmanagecordinator() {
  const [users,setUsers]=useState([])
  const [message,setMessage]=useState([])
  const navigate=useNavigate()
  const [token,setToken]=useState(localStorage.getItem("token"))
  useEffect(()=>{
axios.get("http://localhost:5000/admin/getcordinatordatas")
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
  },[])

  const  DeleteCordinator=(id)=>{
    console.log("id",id)

    const url="http://localhost:5000/admin/delete/"+id
    console.log("url",url)

    axios.delete(url)
    .then((response)=> {
    console.log("DELETE COORDINATOR======",response);

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
 
  return  !token ? (
    navigate("/login")):(
    <div>
      <AdminNav/>
      <div className="slider-area ">
           
           <div className="single-slider slider-height2 d-flex align-items-center" style={{ backgroundImage: "url(" + "assets/img/hero/contact_hero.jpg" + ")"}} >
               <div className="container">
                   <div className="row">
                       <div className="col-xl-12">
                           <div className="hero-cap text-center">
                               <h2>Coordinators</h2>
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
                           <>{item.status===1?<> <div className="col-xl-4 col-lg-4 col-md-6">
                            <div className="single-place mb-30">
                                <div className="place-cap">
                                 <div className="card-title">
                                    <PersonIcon sx={{ fontSize: 40 }}/>
                                </div>
                                    <div className="place-cap-top">
                                       
                                    <h4 className="card-title" key={i}>Name :{item.username} </h4>
                                    <h5 className="card-title" key={i}>Contact : {item.registerdetails[0].phone}</h5>
                                    <h5 className="card-text" key={i}>email : {item.registerdetails[0].email}</h5>
                                   
                                    </div>
                                    <div className="place-cap-bottom">
                                        <ul>
                                            <li> 
                                            <a onClick={()=>DeleteCordinator(item._id)} class="btn" style={{backgroundColor:'#04495271',color:'white'}}>Delete</a> 
                                            </li>
                                            
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div></>:null}
                          </>
                        ))}
                      
                    </div>
                </div>
            </div>
            
            
     <Footer/>
  </div>
  )
}

export default Adminmanagecordinator