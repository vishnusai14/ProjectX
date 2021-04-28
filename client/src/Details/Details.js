import React, { Component } from "react"
import logo from "../assests/images/logo.png"
import Nav from "../nav/Nav"
import classes from "./Details.module.css"
import instance from "../axios/axios"
import Spinner from "../Spinner/Spinner"
 class Detail extends Component {
    state = {
        authenticatedWith : "",
        isLoading : true,
        username : "",
        img : null,
        isAdmin : false,
        email : ""
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
                      username : response.data.user.user,
                      email : response.data.user.email,
                      img : response.data.user.img,
                      isLoading:false,
                      authenticatedWith : response.data.user.authenticatedWith
      
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
      

    render() {
        console.log(this.props.location.state)
        let  class1 = ["row" , classes.profile]
        let class2 = [classes.margintop20, classes.profiledesclink]
        let element  = (
            <> 
                <div  className = {classes.container1}>
    <div  className={class1.join(" ")}>
		<div  className="col-md-3">
			<div  className={classes.profilesidebar}>
				<div  className={classes.profileuserpic}>
					<img style = {{width: "200px", height : "200px" , "borderRadius" : "50%"}} src={this.props.location.state[0].img === "" ? logo :this.props.location.state[0].img}  className={classes.imgresponsive} alt="" />
				</div>
				<div  className={classes.profileusertitle}>
					<div  className={classes.profileusertitlename}>
						{this.props.location.state[0].user}
					</div>
					<div style = {{textTransform : "capitalize"}}  className={classes.profileusertitlejob}>
						{this.props.location.state[0].headline}
					</div>
				</div>
				<div  className={classes.profileuserbuttons}>
					<button style = {{marginRight : "10px"}} type="button"  className="btn btn-success btn-sm">Message</button>
					<button type="button"  className="btn btn-danger btn-sm">Report</button>
				</div>
		
                                         <div>
                                                    <div  className={class2.join(" ")}>
                                                    <i className="fas fa-thumbtack"></i>
                                                        <a href={`https://google.com/maps/${this.props.location.state[0].location}`}>{this.props.location.state[0].location}</a>
 </div></div>                  
                                           
        
        
			</div>
		</div>
		<div  className="col-md-9">
            <div  className={classes.profilecontent}>
			   <h3 style = {{textAlign : "left"}}>About Me :</h3>
               <p>{this.props.location.state[0].generalInfo}</p>
        
			   <h3 style = {{textAlign : "left"}}>My Skills :</h3>
              
               {this.props.location.state[0].advancedSkills.length > 0 && this.props.location.state[0].advancedSkills.map((e) => {
                           return (
                               <>
                            <div key = {Math.random()} className="d-flex flex-row mt-3 exp-container"><i key = {Math.random()} style = {{ marginTop : "auto", marginBottom : "auto"}} className="fas fa-lightbulb"></i>
                            <div key = {Math.random()} className="work-experience ml-1"><span key = {Math.random()} className="font-weight-bold d-block">{e}</span>
                            
                            </div>
                            </div>
                            </>

                )})}
              
              
               </div>
		</div>
	</div>
</div>
            </>
        )
        
      
        return (
            this.state.isLoading ? <Spinner/> : this.state.isAdmin ? <> <Nav auth = {this.state.authenticatedWith} image = {this.state.img} isAdmin = {this.state.isAdmin} username = {this.state.username} /> {element} </> : 
            <><Nav auth = {this.state.authenticatedWith} image = {this.state.img} isAdmin = {this.state.isAdmin} username = "" /> {element} </>
          

        )
    }
}

export default Detail