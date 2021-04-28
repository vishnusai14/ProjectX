import React, { Component } from "react"
import classes from "./Nav.module.css"
import { Link } from 'react-router-dom'
import axios from "axios"
import logo from "../assests/images/logo.png"
import { connect } from "react-redux"
import Googlelogout from "../GoogleLogout/GoogleLogout"
class Nav extends Component {

    state = {
      isAdmin : this.props.isAdmin,
      img : this.props.image,
      auth : this.props.auth
    }

    render() {
      console.log(this.props)
      let image = logo
      if(this.state.img !== "") {
        image = this.state.img
      }else {
        image = logo
      }
      let register = ( 
        <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle text-uppercase font-weight-bold" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Register
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <Link to ="/login" className="dropdown-item text-uppercase font-weight-bold" >Login</Link>
          <div className="dropdown-divider"></div>
          <Link to = "/signup" className="dropdown-item text-uppercase font-weight-bold" >Sign Up</Link>
        </div>
      </li>
      )

let user = (
  <>
    <li className="nav-item"><a href="#" className="nav-link text-uppercase font-weight-bold"><p>{this.props.username}</p></a></li>
          <li className="nav-item dropdown">
          <a href="#" className="nav-link dropdown-toggle" id="navDropDownLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <img className = {classes.userimg} src = {image} alt = "userProfile"/>
        </a>
                  <div className="dropdown-menu" aria-labelledby="navDropDownLink">
              <Link to = "/editprofile" className="dropdown-item">Edit Profile </Link>
              <div className="dropdown-divider"></div>
              {this.state.auth === "Google" ? <Googlelogout />
              :
              <Link to ="/logout" className="dropdown-item" href="#">Logout </Link>
              }
              
          </div>
        </li>
      
      </>

)
        return (

          <header className="header">
            <nav className="navbar navbar-expand-lg fixed-top py-3">
                <div className="container"><Link to = "/feedback" className="navbar-brand text-uppercase font-weight-bold"><i className="fas fa-comment-alt"></i></Link>
                    <button  style = {{backgroundColor: "#666"}} type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" className="navbar-toggler navbar-toggler-right"><i className="fas fa-sliders-h"></i></button>
                    
                    <div id="navbarSupportedContent" className="collapse navbar-collapse">
                        
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item"><Link to = "/"  className="nav-link text-uppercase font-weight-bold">Home <span className="sr-only">(current)</span></Link></li>
                            <li className="nav-item"><a href="#" className="nav-link text-uppercase font-weight-bold">Message</a></li>
                            <li className="nav-item"><a href="#" className="nav-link text-uppercase font-weight-bold">

                                <label className={classes.label}>
                              <div className={classes.toggle}>
                                <input className={classes.togglestate} type="checkbox" name="check" value="check" />
                                <div className={classes.indicator}></div>
                              </div>
                             
                            </label>
                            <div className={classes.labeltext}>no more emails plz</div>
                            </a></li>
                            {this.state.isAdmin ? user : register}
                        </ul>
                    </div>
                </div>
            </nav>
          </header>
          
            
          

        )
    }
}
const mapStateToProps = (state) => {
  return {
      error : state.error,
      loading : state.isLoading,

  }
}



export default connect(mapStateToProps)(Nav)