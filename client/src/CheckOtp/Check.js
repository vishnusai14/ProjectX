import React, { Component } from "react"
import classes from "./Check.module.css"
import { connect } from "react-redux"
import * as actionTypes from "../store/creators/authCreators"
class CheckEmail extends Component {
    componentDidMount = () => {
        this.props.clear()
    }
    state = {
        value : ""
    }
    componentWillUnmount = () => {
        console.log("UnMount")
        this.props.otpClear()
    }

    onChangefiled = (event) => {
        this.setState(prevState => ({
            value : event.target.value
        }))
    }

    click = (event) => {
        this.props.otpVerify(event,this.state.value)
    }

  render() {
    return (
        <>
        <div className = {classes.authForm}>
        <p>An OTP Has Been Sent To Your {this.props.email}</p>
         <input className = {classes.inputField}  onChange = {(event) => {this.onChangefiled(event)} } value = {this.state.value} type = "number" placeholder = "Enter Your OTP" autoComplete = "false" />
         <button onClick = {(event) => {this.click(event)}}>Submit</button>
         </div> 
         <div style = {{display : "flex", alignItems : "center", justifyContent : "center"}}>
             <button style = {{margin : "10px"}} className = "btn btn-primary">Re Send</button>
             
             <button className = "btn btn-primary">Re Signup</button> 
         </div>
         {this.props.error}
       </>
    )
  }
    
}


const mapStateToProps = (state) => {
    return {
        error : state.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        otpVerify : (event, otp) => {dispatch(actionTypes.otpverify(event,otp))},
        clear : () => {dispatch(actionTypes.clear())},
        otpClear : () => {dispatch(actionTypes.otpClear())}
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(CheckEmail)