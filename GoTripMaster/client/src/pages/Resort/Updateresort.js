import React, { useState,useEffect } from 'react'
import {Row,Col,Button} from "react-bootstrap"
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

function Updateresort() {
    const navigate=useNavigate()
    const [token,setToken]=useState(localStorage.getItem("token"))
    const {id}=useParams()
    const [file,setFile]=useState([" "])
    const [item,setItem]=useState({})
    // const [imagesArray,setImagesArray]=useState("")
    // const onImgChange=(e)=>{
    //     console.log(e.target.files);
    //     setImagesArray([imagesArray, ...e.target.files] ) 
    //        console.log("imagesss",imagesArray);
    // }
useEffect(()=>{
    if(!token){ 
        navigate("/login")
    }else{
    console.log(id)
   
axios.get(`http://localhost:5000/resort/showresort/${id}`).then((response)=>{
    console.log(response);
    setItem(...response.data.data)
    console.log(item);
})
    }
},[])
    const addvalue=(e)=>{
        const {name,value}=e.target
        setItem({
            ...item,
            [name]:value
        })
        console.log(item);
            }
          
        const addItem=(e)=>{
            e.preventDefault()
            console.log(item);
            const token=localStorage.getItem("token")
                   
            if(file){
                const data=new FormData();
                const filename=file.name
                data.append("name",filename)
                data.append("file",file)
                axios.post("http://localhost:5000/resort/upload",data)
                .then((response)=>{
                    console.log(response)
                })
            }
            axios.post("http://localhost:5000/resort/updateresort",item)
        .then((resp)=>{
            alert(resp.data.message);
          
        })
        navigate("/resortdashboard")
}
        // console.log(item);
        // const token=localStorage.getItem("token")
        //         // e.preventDefault()
        
            
        //     if(file){
        //         const data=new FormData();
        //         for (const key of Object.keys(imagesArray)) {
        //             data.append('imagesArray', imagesArray[key])
                  
        //         }
              
                // const filename=file.name
                // data.append("name",filename)
                // data.append("file",file)
               
//         fetch('http://localhost:5000/cordinator/additem', {
//             method: 'POST',
//             body: JSON.stringify(item),
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization':'Bearer '+token,
//             },
          
//     }).then(res => res.json())

// .then((demo)=>{
//     alert(demo.message)
   
// })
// navigate("/coordinatordashboard")
    // }
  return (
    <div><div className="hero">
    <div className="innerdiv1">
    <Row>
    <Col></Col>
    
    <Col xs={12} md={8} style={{backgroundColor:"white",marginTop:50,
    color:"black",borderRadius:10,fontSize:"20px",alignContent:"center", padding:"50px"}}> 
     
     <form onSubmit={addItem} encType="multipart/formdata">
  
    
    
  <div className="form-group">
      <label htmlFor="formGroupExampleInput">Resort Name</label>
      <input type="text" className="form-control" id="formGroupExampleInput" onChange={addvalue} value={item.rname}
       name="rname" placeholder='name' required/>
  </div>
  <div className="form-group ">
      <label htmlFor="formGroupExampleInput2 ">Description</label>
      <input style={{height:"70px"}} type="text " className="form-control " id="formGroupExampleInput2 " onChange={addvalue}
       value={item.description} placeholder="description" name="description" required/>
  </div>
  <div className="form-group ">
      <label htmlFor="formGroupExampleInput3 ">Price</label>
      <input type="number" className="form-control " id="formGroupExampleInput3" onChange={addvalue} value={item.price}
       placeholder="price" name="price" required/>
  </div>
  <div className="form-group ">
      <label htmlFor="formGroupExampleInput3 ">Rooms</label>
      <input type="number" className="form-control " id="formGroupExampleInput3" onChange={addvalue} value={item.rooms}
       placeholder="No of Rooms" name="rooms" required/>
  </div>
  <div className="d-flex justify-content-center">
      <div className="btn btn-mdb-color btn-rounded float-left">
          <span>Choose file</span>
          <input type="file" name="image" required  onChange={(e)=>{setFile(e.target.files[0]); setItem({...item,image:e.target.files[0].name})}} multiple/>
      </div>
  </div><br/>
  <Button variant="success" type="submit" >
Update
</Button>  
</form>
    </Col>
    <Col></Col>
</Row>    {/* <input type="file" name="image" required   onChange={(e)=>{onImgChange(e)}} multiple /> */}

        </div>
    </div>
    </div>
  )
}

export default Updateresort