import React, { useState,useEffect } from 'react'
import {Row,Col,Button} from "react-bootstrap"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import CoordinatorNav from '../../Components/CoordinatorNav'
import Footer from '../../Components/Footer'

function CoordinatorAddPackage() {
    const navigate=useNavigate()
    const [token,setToken]=useState(localStorage.getItem("token"))
    const [file,setFile]=useState([" "])
    const [item,setItem]=useState({
        category_id:"",
        pname:"",
        description:"",
        country:"",
        price:"",
        image:"",

    })
   
    const addvalue=(e)=>{
        const {name,value}=e.target
        setItem({
            ...item,
            [name]:value
        })
        console.log(item);
            }
          
    const addItem=(e)=>{
        console.log(item);
        const token=localStorage.getItem("token")
                e.preventDefault()
        if(file){
            const data=new FormData();
            const filename=file.name
            data.append("name",filename)
            data.append("file",file)
            axios.post("http://localhost:5000/cordinator/upload",data)
            .then((response)=>{
                console.log(response)
            })
        }
        fetch('http://localhost:5000/cordinator/additem', {
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'Bearer '+token,
            },
          
    }).then(res => res.json())

.then((demo)=>{
    alert(demo.message)
   
})
navigate("/coordinatorpackages")
    }
  return !token ? (
    navigate("/login")):(
    <div>
<CoordinatorNav/>
<div className="hero">
          <div className="innerdiv1">
<Row>
    <Col></Col>
    
    <Col xs={12} md={8} style={{backgroundColor:"white",marginTop:50,
    color:"black",borderRadius:10,fontSize:"20px",alignContent:"center", padding:"50px"}}> 
     
     <form onSubmit={addItem} encType="multipart/formdata">
   <div className="form-group">
      <label htmlFor="formGroupExampleInput">Choose Category</label>
      <select style={{}}
        className="form-select" 
        aria-label="Default select example"
        name="category_id"
        value={item.category_id}
        onChange={addvalue}
        >
        <option selected>Choose </option>
        <option value="1">Iternational Packages</option>
        <option value="2">Packages</option>
        </select>
  </div>
    
    
  <div className="form-group">
      <label htmlFor="formGroupExampleInput">Package Name</label>
      <input type="text" className="form-control" id="formGroupExampleInput" onChange={addvalue} value={item.pname}
       name="pname" placeholder='name' required/>
  </div>
  <div className="form-group ">
      <label htmlFor="formGroupExampleInput2 ">Description</label>
      <textarea style={{height:"70px"}} type="text " className="form-control " id="formGroupExampleInput2 " onChange={addvalue}
       value={item.description} placeholder="description" name="description" required/>
  </div>
  <div className="form-group">
      <label htmlFor="formGroupExampleInput">Country</label>
      <input type="text" className="form-control" id="formGroupExampleInput" onChange={addvalue} value={item.country}
       name="country" placeholder='name' required/>
  </div>
  <div className="form-group ">
      <label htmlFor="formGroupExampleInput3 ">Price</label>
      <input type="number" className="form-control " id="formGroupExampleInput3" onChange={addvalue} value={item.price}
       placeholder="price" name="price" required/>
  </div>
  <div className="d-flex justify-content-center">
      <div className="btn btn-mdb-color btn-rounded float-left">
          <span>Choose file</span>
          <input type="file" name="image" required  onChange={(e)=>{setFile(e.target.files[0]); setItem({...item,image:e.target.files[0].name})}} />
      </div>
  </div><br/>
  <Button variant="warning" style={{padding:10,width:"210px"}} type="submit" >
 ADD
</Button>  
</form>
    </Col>
    <Col></Col>
</Row>
              </div>
          </div>
          <Footer/>
    </div>
  )
}

export default CoordinatorAddPackage