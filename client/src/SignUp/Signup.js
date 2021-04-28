import React, { Component } from "react"
import classes from "./Signu.module.css"
import Browse from "../assests/images/Browse.png"
import Nav from "../nav/Nav"
import { connect } from "react-redux"
import * as actionTypes from "../store/creators/authCreators"
import { withRouter } from "react-router"
import Check from "../CheckOtp/Check"
import Google from "../GoogleLogin/Google"
import Spinner from "../Spinner/Spinner"
class SignUp extends Component {

    componentDidMount = () => {
        this.props.clear()
    }
    state = {
        locations : [],
        stateError : "",
        isAdmin : false,
        isCompany : false,
        fullname : "",
        email : "",
        password : "",
        image : "",
        info : "",
        position : "Person",
        location : "",
        companyName : "",
        headline : "",
        specializedIn : ""
    }


    API = "rV_wg1YKgvxe0Lz5O0B48-2CaTTM_PrCuBXjhjBmQ2E"
 autosuggest = (event) => {
    if(event.metaKey) {
      return
    } 
    let searchString = event.target.value
    if (searchString !== "") {
      fetch(`https://autosuggest.search.hereapi.com/v1/autosuggest?apiKey=${this.API}&at=33.738045,73.084488&limit=5&resultType=city&q=${searchString}&lang=en-US`)
      .then(res => res.json())
      .then((json) => {
        if (json.length !== 0) {
          document.getElementById("search").innerHTML = ``;
        }
          
        this.setState(prevState => ({
            ...prevState,
            locations : json.items,
            location : event.target.value
      }))      
      
      console.log(this.state)
      }).catch((e) => {
          console.log(e)
      }).catch((E) => {
          console.log(E)
      });
    }
  };


    nameHandler = (e) => {
        this.setState(prevState => ({
            ...prevState,
            fullname : e.target.value
        }))
    }
    emailHandler = (e) => {
        this.setState(prevState => ({
            ...prevState,
            email : e.target.value
        }))
    }
    passwordHandler = (e) => {
        this.setState(prevState => ({
            ...prevState,
            password : e.target.value
        }))
    }
    imageHanlder = (e) => {
        console.log(e.target.files[0])
        const reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onloadend = () => {
            // console.log(reader.result)
            this.setState(prevState => ({
                ...prevState ,
                 image : reader.result
            }))
        }
    }

    companyName = (e) => {
        this.setState(prevState => ({
            ...prevState,
            companyName : e.target.value
        }))
    }
    specialized = (e) => {
        this.setState(prevState => ({
            ...prevState,
            specializedIn : e.target.value
        }))
    }



    infoHandler = (e) => {
        this.setState(prevState => ({
            ...prevState,
            info : e.target.value
        }))
    }

    headlineHandler = (e) => {
        this.setState(prevState => ({
            ...prevState,
            headline : e.target.value
        }))
    }


    submitHandler =(e) => {
        e.preventDefault()
        if(this.state.email === "" || this.state.fullname === "" || this.state.password === "" || this.state.headline === "" || (this.state.position === "Company" && this.state.companyName === "") ||(this.state.position === "Company" && this.state.specializedIn === "") || this.state.info === "") {
            this.setState(prevState => ({
                ...prevState ,
                stateError : "Please Enter ALL The Specified Details"
            }))
            console.log(this.state)
        }else {
            console.log("From SubmitHandler")
            this.props.auth(e, this.state.email, this.state.password, this.state.fullname, this.state.image, this.state.companyName, this.state.location, this.state.headline, this.state.info, this.state.specializedIn,this.state.position,"Email")
        }
        
    }
    changeHandler = (e) => {
        if(e.target.value === "Company"){
            this.setState(prevState => ({
                ...prevState ,
                isCompany : true,
                position : e.target.value
            }))
        }else {
            this.setState(prevState => ({
                ...prevState ,
                isCompany : false,
                position : e.target.value,
                companyName : "",
                specializedIn : ""
            }))
        
        }
    }
    render() {
        let class3 = ["form-control", classes.formcontrol]
        let class4 = [classes.box, "text-center"] 
        let class5 = [classes.inputfile1, classes.inputfile4]
        let ele = (
            <>
            <div className="row">
            <div className="col-lg-6 col-md-6">
            <div style = {{marginBottom : "50px"}} className="form-group">
            <label htmlhtmlfor="exampleInputCompanyName">Company</label>
            <input onChange = {(e) => {this.companyName(e)}} type="text" className={class3.join(" ")} id="exampleInputCompanyName" placeholder = "Enter Your Company Name"  required />
            </div>
            </div>
            <div className="col-lg-6 col-md-6">
            <div style = {{marginBottom : "50px"}} className="form-group">
            <label htmlhtmlfor="exampleCompanySpecial">Specilazation In ?</label>
            <input onChange = {(e) => {this.specialized(e)}} type="text" className={class3.join(" ")} id="exampleCompanySpecial" placeholder="Specilazation in ?" required />
            </div>
            </div>
            </div>
            </>
             )

             let ele2 = (
                 <> 
                     <Nav userimg = {null}  username = ""/>
                     
                    <section className={classes.postuser}>
                   
                    <div className={classes.verticalspace101}></div>
                    <div className="container">
                    <Google margin = "-10px" />
                    <div className={classes.verticalspace60}></div>
                    <div className = {classes.userpostbox}>
                   
                    <div style = {{marginBottom : "50px"}} className="form-group">
                    <label htmlhtmlfor="exampleInputName">Full Name</label>
                    <input onChange = {(e) => {this.nameHandler(e)}} type="text" className={class3.join(" ")} id="exampleInputName" placeholder="Enter your Full Name" required />
                    </div>
                    <div style = {{marginBottom : "50px"}} className="form-group">
                    <label htmlhtmlfor="exampleInputemail">Email</label>
                    <input onChange = {(e) => {this.emailHandler(e)}}  type="email" className={class3.join(" ")} id="exampleInputemail" placeholder="Enter your Email" required />
                    </div>  <div style = {{marginBottom : "50px"}} className="form-group">
                    <label htmlhtmlfor="exampleInputPassword">Password</label>
                    <input onChange = {(e) => {this.passwordHandler(e)}} type="password" className={class3.join(" ")} id="exampleInputPassword" placeholder="Enter your Password" required />
                    </div>
                    <div className="row">
                    <div className="col-lg-6 col-md-6">
                    <div style = {{marginBottom : "50px"}} className="form-group">
                    <label htmlhtmlfor="exampleInputCompany">Company</label>
                    <select  type="text" className={class3.join(" ")} id="exampleInputCompany"  required onChange = {(e) => {this.changeHandler(e)}}>
                        <option>Person</option>
                        <option>FreeLancer</option>
                        <option>Company</option>
                    </select>
                    

                    </div>
                    </div>
                    {this.state.isCompany ? ele : null}

                    <div className="col-lg-6 col-md-6">
                    <div style = {{marginBottom : "50px"}} className="form-group">
                    <label htmlhtmlfor="exampleInputLoction">Loction</label>
                    <input autoComplete = "off"  onChange = {(e) => {this.autosuggest(e)}} list = "locations" className = {class3.join(" ")} id = "search" type = "text" placeholder = "Location" />
        

        <datalist id = "locations"> {    
            this.state.locations.map((item) => {
                let tag = ""
                if ((item.position !== undefined) && (item.position !== "")){
                    tag = <option  key = {Math.random()}>{item.title}</option>
                }

                return tag
                })
            }
        </datalist>
                    </div>
                    </div>
                    <div style = {{marginBottom : "50px"}} className="form-group">
                    <label htmlhtmlfor="exampleInputHeadline">Job Postion</label>
                    <input onChange = {(e) => {this.headlineHandler(e)}} type="text" className={class3.join(" ")} id="exampleInputHeadline" placeholder="Enter The Job Postion" required />
                    </div>

                    </div>
                    <div className="row">
                    <div className="col-lg-6 col-md-6">
                    <div style = {{marginBottom : "50px"}} className="form-group ">
                    <label>User Profile</label>
                    <div className={class4.join(" ")}>
                  
                    <input onChange = {(e) => {this.imageHanlder(e)}} ref = {fileinput => this.fileinput = fileinput} type="file" accept="image/x-png,image/jpeg" name="file-4[]" id="file-4" className={class5.join(" ")}  />
                    <label style = {{marginTop : "-40px"}} htmlhtmlfor="file-4">
                    <i>
                    <img onClick = {() => {this.fileinput.click()}}  src={Browse} className="imtges" alt="" />
                    </i>
                    <span onClick = {() => {this.fileinput.click()}}>Choose your file here<i className={classes.fontcolororange}>Browse</i></span>
                    </label>
                    </div>
                    </div>
                    </div>


                    {this.state.image ?  <> 
                    <div className="col-lg-6 col-md-6">
                    <div style = {{marginBottom : "50px"}} className="form-group ">
                    <label>Preview Image</label>
                    <div className={class4.join(" ")}>
                  
                   
                    <img style = {{width : "100%" , height : "100%"}}   src={this.state.image} className="imtges" alt="Preview" />
                    </div>
                    </div>
                    </div>

                        </> : null
                    }

                    </div>
                    <div style = {{marginBottom : "50px"}} className="form-group">
                    <label htmlhtmlfor="exampleInputLongDescription">Write full description</label>
                    <textarea onChange = {(e) => {this.infoHandler(e)}}  className={class3.join(" ")} id="exampleInputLongDescription" placeholder="Write Full description" rows="3" required></textarea>
                    </div>
                    <div style =  {{marginBottom : "50px"}} className="form-group">
                    <label>Agree with term and conditions</label>
                    <div className="form-check">
                    <input type="checkbox" className="form-check-input " id="exampleCheck1" required />
                    <label className="form-check-label text-left" htmlhtmlfor="exampleCheck1">Lorem ipsum tempus amet conubia adipiscing fermentum viverra gravida, mollis suspendisse pretium dictumst inceptos mattis euismod lorem nulla magna duis nostra sodales luctus nulla</label>
                    </div>
                    </div>
                    {this.props.error}
                    {this.state.stateError}
                    <button  onClick = {(e) => {this.submitHandler(e)}} type="submit" className="btn Post-Job-Offer">Sign Up</button>
                   
                    </div>
                    </div>
                   
                    </section>
                 
                 </>
             )
             console.log(this.props.token)
             console.log(this.props.token !== null)
        return (

            this.props.loading ? <Spinner/> :
            this.props.otpCheck ? <Check email = {this.state.email}/> :
            ele2
            
            

            
            
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token : state.token,
        error : state.error,
        loading : state.isLoading,
        otpCheck : state.otpCheck
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        auth : (event,email,password,userName,img,companyName,location,headline,info,specializedIn,position,authenticatedWith) => {dispatch(actionTypes.auth(event,email,password,userName,img,companyName,location,headline,info,specializedIn,position,authenticatedWith))},
        clear : () => {dispatch(actionTypes.clear())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignUp))


// this.state.companyName, this.state.location, this.state.headline, this.state.info, this.state.specializedIn?