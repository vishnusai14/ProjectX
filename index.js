require("dotenv").config()
const Cookie = require("universal-cookie")
const express = require("express")
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const bcrypt = require('bcryptjs')
const nodemailer = require("nodemailer")

const secret = process.env.JWT_SECRET

const path = require("path")

const app = express()
app.use(cors())
app.use(bodyParser.json({limit : "50mb"}))

//Creating Transporter For Sending Email 



const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL,
        pass: process.env.GMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
})





// Mongoose Schema

// let url = `mongodb+srv://Vishnu_Sai:${process.env.DBPASSWORD}@cluster0.hkghe.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`

let url  = "mongodb://localhost:27017/projectx"

const userSchema = new mongoose.Schema({
    user : {
        type : String
    },
    password : {
        type : String,
    },
    email : {
        type : String
    },
    authenticatedWith : {
        type : String
    },
    verify : {
        type : Boolean
    },
    img  : {
        type : String
    },
    location: {
        type : String 
    },
    generalinfo : {
        type : String
    },
    advancedSkills : {
        type : Array
    },
    headline : {
        type : String
    },
    position : {
        type : String
    },
    specializedIn : {
        type : String
    },
    companyName : {
        type : String
    }

})


const userModel = mongoose.model("user" , userSchema)


//connect with mongooe

mongoose.connect(url , {
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useFindAndModify : false
}).then((response) => {
    console.log(response)
}).catch((err) => {
    console.log(err)
})



//Login Part


app.post("/checkuser" , (req,res) => {


    
    userModel.findOne({email : req.body.email} , (err, found) => {
        if(err) {
            res.status(500).send({error : "SomeError"})
            res.end()
        }
        if(!found){
            res.status(401).send({error : "No User Exists"})
        }else{ 
            if(found.verify){
                if(req.body.email === found.email){
                    bcrypt.compare(req.body.password, found.password, (err,result) => {
                        if(result){
                            let data = {
                                email : req.body.email,
                                user : req.body.user
                            }
                            let token = jwt.sign(data,secret)
                            let responseData = {
                                msg : "Success",
                                tokenId : token
                            }
                          
                            res.status(200)
                           
                            res.send(responseData)
                            
                            res.end()
                        }else{
                            res.status(401).send({error : 'Password Error'})
                            res.end()
                        } 
                    })
                }else{
                    res.status(401).send({error : 'Check Username Or Password'})
                    res.end()
                }
            }else{
                
                res.status(401).send({error : 'No User Exists'})
            }
            
           
                
            
        }
    })
})








//Save Our new User 

app.post("/newuser" , (req,res)=>{

  
    
    userModel.findOne({email : req.body.email} , (err, found) => {
        if(err) {
            res.status(500).send({error : "Some Internal Error"})
            res.end()
        }


        if(found) {
            if(found.authenticatedWith === "Google" && req.body.authenticatedWith === "Google") {
                let data = {
                    email : req.body.email,
                    user : req.body.user
                }
                let token = jwt.sign(data,secret)
                
    
                let responseData = {
                    msg : "Success",
                    tokenId : token,
                }
            
                res.status(200)
               
                res.send(responseData)
                
                res.end()

            } else if (found.verify === false) {

                userModel.deleteOne({email : found.email} , (err, result) => {
                    if(err) {
                        console.log(err)
                    }else {
                        console.log(result)
                    }
                })
                let hashedPassword = null
                bcrypt.hash(req.body.password, 2 , (err, hash) => {
                    hashedPassword = hash
                    
                    let user = new userModel({
                        user : req.body.user,
                        email : req.body.email,
                        password : hashedPassword,
                        img : req.body.img,
                        location : req.body.location,
                        specializedIn : req.body.specializedIn,
                        companyName : req.body.companyName,
                        generalInfo : req.body.generalInfo,
                         headline : req.body.headline.toLowerCase(),
                         position :req.body.position,
                         authenticatedWith : req.body.authenticatedWith,
                        verify : false
                    })
                  
                    user.save()
                }) 
               
    

                const otp = Math.ceil(Math.random() * 10000)
                const otp_string = otp.toString()
                let mailOptions = {
                    from: process.env.GMAIL,
                    to: req.body.email,
                    subject: 'OTP',
                    html: `<h3>Your OTP is : </h3><br />${otp}`
                }
                transporter.sendMail(mailOptions, function(error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                        
                    }
                })
                let data = {
                    email : req.body.email,
                    user : req.body.user
                }
                let token = jwt.sign(data,secret)
                
    
                let responseData = {
                    msg : "Success",
                    tokenId : token,
                    otp : otp_string
                }
            
                res.status(200)
               
                res.send(responseData)
                
                res.end()
            }
            else {
                res.status(401).send({error : "User Already Exist"})
            }
            
        
    }else if(req.body.authenticatedWith === "Google") {

            let user = new userModel({
                user : req.body.user,
                email : req.body.email,
                password : req.body.password,
                img : req.body.img,
                location : req.body.location,
                specializedIn : req.body.specializedIn,
                companyName : req.body.companyName,
                generalinfo : req.body.generalInfo,
                headline : req.body.headline.toLowerCase(),
                position :"Person",
                authenticatedWith : req.body.authenticatedWith,
                verify : true
            })

            user.save()
            let data = {
                email : req.body.email,
                user : req.body.user
            }
            let token = jwt.sign(data,secret)
            

            let responseData = {
                msg : "Success",
                tokenId : token,
            }
        
            res.status(200)
           
            res.send(responseData)
            
            res.end()

        }
        
        
        else {
            const otp = Math.ceil(Math.random() * 10000)
            const otp_string = otp.toString()
            let mailOptions = {
                from: process.env.GMAIL,
                to: req.body.email,
                subject: 'OTP',
                html: `<h3>Your OTP is : </h3><br />${otp}`
            }
            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                    
                }
            })
            let hashedPassword = null
            bcrypt.hash(req.body.password, 2 , (err, hash) => {
                hashedPassword = hash
                
                let user = new userModel({
                    user : req.body.user,
                    email : req.body.email,
                    password : hashedPassword,
                    img : req.body.img,
                    location : req.body.location,
                    specializedIn : req.body.specializedIn,
                    companyName : req.body.companyName,
                    generalinfo : req.body.generalInfo,
                    headline : req.body.headline.toLowerCase(),
                    position :req.body.position,
                    authenticatedWith : req.body.authenticatedWith,
                    verify : false
                })
            
                user.save()
            }) 
            
            let data = {
                email : req.body.email,
                user : req.body.user
            }
            let token = jwt.sign(data,secret)
            

            let responseData = {
                msg : "Success",
                tokenId : token,
                otp : otp_string
            }
        
            res.status(200)
           
            res.send(responseData)
            
            res.end()
        }          
        
     })
   
   
})


//Checking The User Entered OTP


app.post("/checkotp" , (req,res) => {
    const cookie = new Cookie(req.headers.cookie)
   
    let token = req.body.token
    let otp = req.body.otp
    let otp_crypt = req.body.otp_crypt
  
    if(token){
        try{
            let user = jwt.verify(token, secret)
            if(user) {
               bcrypt.compare(otp.toString(), otp_crypt , (err, result) => {
                   if(result) {
                    userModel.updateOne({email : user.email} , {verify : true} , (err , result) => {
                        if(err) {
                            console.log(err)
                        }else{
                            res.status(200).send(token)
                        }
                    })
                }else{
                    res.status(401).send({error : "Check The Otp "})
                    res.end()
                }
                   
               })
                    
               
            }
        }catch(err){
            res.status(401).send({error : "No User "})
            res.end()
        }
        
    }else{
        res.status(401).send({error : "Unauthorized"})
    }

})


//Checking If the User Is Authenticated Using The Token
app.post("/check" , (req,res) => {
    
    let token = req.body.token
   
    if(token){
    
        let user2 = jwt.verify(token, secret)
    
        try{
            let user = jwt.verify(token, secret)
    
            if(user) {
                userModel.findOne({email : user.email}, (err, found) => {
                    if(err) {
                        console.log(err)
                    }else {
                        if(found) {
    
                            let result = {
                                user : found.user,
                                email : found.email,
                                img : found.img,
                                skills : found.advancedSkills,
                                companyName : found.companyName,
                                specializedIn : found.specializedIn,
                                headline : found.headline,
                                info : found.generalinfo,
                                location : found.location,
                                position :found.position,
                                authenticatedWith : found.authenticatedWith
                            }
    
                            res.status(200).send({user : result})
                        }
                    }
                })
            }
        }catch(err){
            res.status(401).send({error : "No User "})
            res.end()
        }
        
    }else{
        res.status(401).send({error : "Unauthorized"})
        res.end()
    }
    
    
})


app.post("/updateprofile" , (req,res) => {
    let token = req.body.token
   
    if(token){
    
        let update = {
            user : req.body.newUserName,
            img : req.body.newimage,
            location : req.body.newlocation,
            generalinfo : req.body.newinfo,
            advancedSkills : req.body.newskills,
            specializedIn : req.body.newSpecializedIn,
            companyName : req.body.newCompanyName,
            headline : req.body.newHeadline.toLowerCase()
        }
        try{
            let user = jwt.verify(token, secret)
    
            if(user) {

                userModel.findOneAndUpdate({email : user.email} , update , (err , result) => {
                    if(err) {
                        console.log(err)
                    }else {
                        if(result) {
                            res.status(200).send({data : result})
                        }else {
                            res.status(401).send({data : "Error"})
                        }
                    }
                })

            }
        }catch(err) {
                res.status(500).send({data : "Error"})
        }
    }

})


app.post("/getworkers" , (req,res) => {
    console.log(req.body)
    let headline = req.body.headline.toLowerCase()
    let location = req.body.location 
    let position = req.body.position 
    let token = req.body.token
    userModel.find({headline : headline, location : location, position : position} , (err, result) => {
        if(err) {
            console.log(err)
            res.status(500).send({error : "Internal Server Error"})
        }else {
            if(result.length !== 0) {
                let filterdResult
                if(token !== null) {
                    try {
                        let user =  jwt.verify(token, secret)
                        if(user) {
                            filterdResult = result.filter((e) => {
                                return e.verify === true && e.email !== user.email
                            })
                            const data = filterdResult.map((e) => {
                                return({
                                    id : e._id,
                                    advancedSkills : e.advancedSkills ,
                                    user : e.user,
                                    img : e.img,
                                    location : e.location,
                                    specializedIn : e.specializedIn,
                                    comapnyName : e.companyName,
                                    generalInfo : e.generalinfo,
                                    headline : e.headline,
                                    position : e.position
                                })
                            })
                            res.status(200).send({data : data})
                        
                        }
                    } catch (error) {
                        res.status(401).send({error : "Un Authorized"})
                    }

                }else {
                    filterdResult = result.filter((e) => {
                        return e.verify === true
                    })
                    const data = filterdResult.map((e) => {
                        return({
                            id : e._id,
                            advancedSkills : e.advancedSkills ,
                            user : e.user,
                            img : e.img,
                            location : e.location,
                            specializedIn : e.specializedIn,
                            comapnyName : e.companyName,
                            generalInfo : e.generalinfo,
                            headline : e.headline,
                            position : e.position
                        })
                    })
                    res.status(200).send({data : data})
                
                }
                    
                
            }else {
                res.status(200).send({data : "No User Found"})
            }
        }
    })

})




const PORT = process.env.PORT || 8080

if(process.env.NODE_ENV === 'production'){

    app.use(express.static('client/build'))

    app.get('*' , (req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })


}


app.listen(PORT, () => {
    console.log("Server Started on The Specified PORT")
})