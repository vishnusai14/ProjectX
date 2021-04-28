import React , { Component } from "react"
import classes from  "./SearchResult.module.css"
import Header from "../Header/Header"
import logo from "../assests/images/logo.png"
import Spinner from "../Spinner/Spinner"
import instance from "../axios/axios"
import { Redirect } from "react-router"
class CoWorkers extends Component {

    state = {
        isAdmin : false,
    }



    componentDidMount = () => {
        console.log("Mount")
      
        let token = localStorage.getItem('SSUID')
        console.log(token)
         
              let data = {
                  token : token
              }
            
              console.log(data)
              instance.post("/check" ,data)
              .then((response) => {
                 
                  if(response.data){
                    this.setState(prevState => ({
                      ...prevState,
                      isAdmin : true,
                    }))
                  }
                  console.log(response)
              })
              .catch((err) => {
                  this.setState(prevState => ({
                    ...prevState,
                    isAdmin : false,
                    isLoading:false
      
                  }))
                 
                
              })
            
              console.log(this.state)
            
            
        
      }

    
    viewProfile = (e, id) => {
        e.preventDefault()
        let array = this.props.location.state.data.data
        let newArray = array.filter((i) => {
            return i.id === id
        })
        this.props.history.push({
            pathname : "/worker-details",
            state : newArray
        })
    }

    render() {
        let noUser = (
            <div className = {classes.selectionwrapper}>
                 <strong style = {{position : "relative" , top : "-70px"}}>No User Found</strong>
            </div>
        )
        console.log(this.props)
        return (
            this.props.location.state === undefined ? <Redirect to = "/"></Redirect>:

           this.props.location.state.loading ? <Spinner /> : 
               

        <>
           <Header/>
          {this.props.location.state.data.data === "No User Found" ? noUser : 
           <>
           <strong style = {{position : "relative" , top : "-70px"}}>{this.props.location.state.data.data.length} Number Of Users Found</strong>
           <div className = {classes.container2}>
            
           <button style = {{width : "300px"}} disabled = {this.state.isAdmin ? false : true} className= {classes.anchorsendall}><span style ={{top : "-10px"}}>{this.state.isAdmin ? "Send Message To Selected" : "Login To Send Message" }</span></button>
           <div className="container">
           
               {this.props.location.state.data.data.map((e) => {
                   console.log(e)
                   return (
                               <div style = {{marginTop : "20px" , marginBottom : "20px"}} className={classes.selectionwrapper} key = {e.id}>
                              
                               <label htmlFor={e.id} className={classes.selectedlabel}>
                                   <input type="checkbox" name="selected-item" id={e.id} />
                                   <span className={classes.icon}></span>
                                                    
                                   <div style = {{ backgroundColor: "transparent" , border: "none"}} className="card">
                                       <div className="card-wrapper">
                                           <div style = {{display : "flex", alignItems : "left"}} className="row align-items-center">
                                               <div className="col-12 col-md-4">
                                                   <div style = {{width : "fit-content" , backgroundColor : "white" , borderRadius : "50%"}} className="image-wrapper">
                                                       <img style = {{width: "200px", height : "200px" , "borderRadius" : "50%"}}  src={e.img === "" ? logo : e.img} alt="Mobirise" />
                                                   </div>
                                               </div>
                                               <div className="col-12 col-md">
                                                   <div style = {{width: "100%"}} className="card-box">
                                                       <h6 style = {{ lineHeight: "1" , wordBreak: "break-word", wordWrap: "break-word", fontWeight: "400"}} className="card-title mbr-fonts-style m-0 display-5">
                                                           <strong>{e.name}</strong>
                                                       </h6>
                           
                                                      <ul className = {classes.details}>
                                                          <li className = {classes.detail}>
                                                          <i style = {{marginRight : "5px"}} className="fas fa-thumbtack"></i>{e.location}
                                                          </li>
                                                          <li className = {classes.detail}>
                                                          <i style = {{marginRight : "5px"}} className="far fa-star"></i> 5
                                                          </li>
                                                          <li className = {classes.detail}>
                                                          <i style = {{marginRight : "5px"}} className="fas fa-drafting-compass"></i>{e.advancedSkills ? e.advancedSkills.join(",") : null}
                                                          </li>
                                                      </ul>
                                                       
                                                       <div  style = {{ lineHeight: "1" , wordBreak: "break-word", wordWrap: "break-word", fontWeight: "400"}} className="social-row display-7">
                                                           
                                                           <div className = {classes.btn}>
                                                               <button  onClick = {(event) => {this.viewProfile(event, e.id)}}  className = {classes.anchor}>View Profile</button>
                                                               <button disabled = {this.state.isAdmin ? false : true}  className = {this.state.isAdmin ? classes.anchor : null }>{this.state.isAdmin ? "Send Message" : "Login To Message" }</button>
                                                           </div>
                                                           
                                                       </div>
                                                   </div>
                                               </div>
                                           </div>
                                       </div>
                                   </div>
                                 
                               </label>
                               <hr/>                                
                           </div>
                       )
               })}
           </div>
           </div>
           </>   
          
           }

       

        
         </>
        
        
            
        
        
        
        
        
           )
    }
}


export default CoWorkers
