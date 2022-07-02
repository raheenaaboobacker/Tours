import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {useParams} from "react-router-dom"
import CoordinatorNav from '../../Components/CoordinatorNav'
import {Row,Col,Button} from "react-bootstrap"
import {useNavigate} from "react-router-dom"


function CoordinatorUpdatePackage() {
    const navigate=useNavigate()
    const [token,setToken]=useState(localStorage.getItem("token"))
    const {id}=useParams()
    const [file,setFile]=useState([""])
    const [item,setItem]=useState({
        _id:id,
        pname:"",
        description:"",
        price:"",
        image:"",

    })
    useEffect(()=>{
axios.get(`http://localhost:5000/cordinator/findupdatedata/${id}`).then(response=>{
    console.log(response.data.data);
    setItem(...response.data.data)
    console.log(item);
})
    },[])

    const handleInputChange=(e)=>{
        const {name,value}=e.target;
        setItem({
            ...item,
            [name]:value
        })
        
    }
    const updatePackage=(e)=>{
        e.preventDefault()
        console.log("DATAAAA");
        console.log(item);
        if(file){
            const datas=new FormData();
            const filename=file.name
            datas.append("name",filename)
            datas.append("file",file)
            axios.post("http://localhost:5000/cordinator/upload",datas)
            .then((response)=>{
                console.log(response)
            })
        }
      
        axios.post("http://localhost:5000/cordinator/updatepackage",item)
        .then((resp)=>{
            alert(resp.data.message);
          
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
    
    <Col xs={12} md={8} style={{backgroundColor:"white",marginTop:100,
    color:"black",borderRadius:10,fontSize:"20px",alignContent:"center", padding:"50px"}}> 
     
     <form onSubmit={updatePackage} encType="multipart/formdata">
     <div className="form-group">
      <label htmlFor="formGroupExampleInput">Package Name</label>
      <input type="text" className="form-control" id="formGroupExampleInput" onChange={handleInputChange} value={item.pname}
       name="pname"  required/>
  </div>
  
  <div className="form-group ">
      <label htmlFor="formGroupExampleInput2 ">Description</label>
      <input style={{height:"70px"}} type="text " className="form-control " id="formGroupExampleInput2 " onChange={handleInputChange}
       value={item.description}  name="description" required/>
  </div>
  <div className="form-group ">
      <label htmlFor="formGroupExampleInput3 ">Price</label>
      <input type="number" className="form-control " id="formGroupExampleInput3" onChange={handleInputChange} value={item.price}
        name="price" required/>
  </div>
  <img style={{width:"200px",height:"200px",paddingTop:"15px"}} src={`../upload/${item.image}`}/>
      <div className="d-flex justify-content-center">
          <div className="btn btn-mdb-color btn-rounded float-left">
              <span>Choose file</span>
              <input type="file" name="image" onChange={(e)=>{setFile(e.target.files[0]); setItem({...item,image:e.target.files[0].name})}} required   />
          </div>
      </div><br/>
      <Button variant="warning" style={{padding:10,width:"210px"}} type="submit" >
     Update
    </Button>  
  </form>
    </Col>
    <Col></Col>
</Row>
              </div>
          </div>
    </div>
  )
}

export default CoordinatorUpdatePackage