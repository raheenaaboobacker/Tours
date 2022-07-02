import axios from 'axios'
import React, { useEffect,useState } from 'react'
import Footer from '../../Components/Footer'
import PersonIcon from '@mui/icons-material/Person';
import ResortNav from '../../Components/ResortNav'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap';

function ManageCoordinator() {
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
   const item=users.filter((filterdata) => {
    return filterdata.registerdetails[0].r_id.includes(localStorage.getItem("resort_Id"))
  })
  return !token ? (
    navigate("/login")):(
    <div>
          
      <ResortNav/>
      <div className="slider-area ">
           
           <div className="single-slider slider-height2 d-flex align-items-center" style={{ backgroundImage: "url(" + "assets/img/hero/h1_hero.jpg" + ")"}} >
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
                    {item.length>0?<>
                        {item .map((item,i)=>(
                            <div className="col-xl-4 col-lg-4 col-md-6">
                            <div className="single-place mb-30">
                           
                            <div style={{padding: "28px 40px", border:" 1px solid #f0f1f2"}}>
                                <div className="card-title">
                                    <PersonIcon sx={{ fontSize: 40 }}/>
                                </div>
                                    <div className="place-cap-top">
                                       
                                    <h4 className="card-title" key={i}>Name :{item.username} </h4>
                                    <h5 className="card-title" key={i}>Contact : {item.registerdetails[0].phone}</h5>
                                    <h5 className="card-text" key={i}>email : {item.registerdetails[0].email}</h5>
                                   
                                    </div>
                                  <br/><br/>
                                    <div className="place-cap-bottom">
                                       
                                            < Button style={{padding:10,width:"110px"}} variant="warning" onClick={()=>DeleteCordinator(item._id)} >Delete</Button> 
                                          
                                            {item.status===0?
                                              <>  < Button style={{marginLeft:10,padding:10,width:"110px"}} variant="warning" onClick={()=>ApproveUser(item._id)}
                                             >
                                                          Approve</Button></>:
                                              null} 
                                            
                                    </div>
                                </div>
                            </div>
                        </div>
                       ))}</>:<div style={{width:"600px", margin:"auto"}}><div style={{textAlign:"center",fontSize:20}}  className="alert alert-warning" role="alert">
                       Coordinator Not Found!
                      </div></div>}
                      
                    </div>
                </div>
            </div>
            
            
     <Footer/>
    </div>
  )
}

export default ManageCoordinator