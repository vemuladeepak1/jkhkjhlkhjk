import { useState, useContext } from "react";
import { useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha"
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { useHistory } from "react-router-dom";
import {
  Grid,
  TextField,
  Button,
  Typography,
  makeStyles,
  Paper,
  MenuItem,
  Input,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search"
import { toast } from 'react-toastify';
import axios from "axios";
import { Redirect } from "react-router-dom";
import ChipInput from "material-ui-chip-input";
import DescriptionIcon from "@material-ui/icons/Description";
import FaceIcon from "@material-ui/icons/Face";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";

import PasswordInput from "../lib/PasswordInput";
import EmailInput from "../lib/EmailInput";
import FileUploadInput from "../lib/FileUploadInput";
import { SetPopupContext } from "../App";

import apiList from "../lib/apiList";
import isAuth from "../lib/isAuth";
import { Flag, Search } from "@material-ui/icons";
const useStyles = makeStyles((theme) => ({
  body: {
    padding: "60px 60px",
  },
  inputBox: {
    width: "400px",
  },
  submitButton: {
    width: "400px",
  },
  inputIcon:{
  margin: 0,
  position: "absolute",
  top: "50%",
  right:"0px",
  transform: "translate(-50%,-50%)",
  }
}));

const MultifieldInput = (props) => {
  const classes = useStyles();
  const { education, setEducation } = props;

  return (
    <>
      {education.map((obj, key) => (
        <Grid
          item
          container
          className={classes.inputBox}
          key={key}
          style={{ paddingLeft: 0, paddingRight: 0 }}
        >
          <Grid item xs={6}>
            <TextField
              label={`Institution Name #${key + 1}`}
              value={education[key].institutionName}
              onChange={(event) => {
                const newEdu = [...education];
                newEdu[key].institutionName = event.target.value;
                setEducation(newEdu);
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Start Year"
              value={obj.startYear}
              variant="outlined"
              type="number"
              onChange={(event) => {
                const newEdu = [...education];
                newEdu[key].startYear = event.target.value;
                setEducation(newEdu);
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="End Year"
              value={obj.endYear}
              variant="outlined"
              type="number"
              onChange={(event) => {
                const newEdu = [...education];
                newEdu[key].endYear = event.target.value;
                setEducation(newEdu);
              }}
            />
          </Grid>
        </Grid>
      ))}
      <Grid item>
        <Button
          variant="contained"
          color="secondary"
          onClick={() =>
            setEducation([
              ...education,
              {
                institutionName: "",
                startYear: "",
                endYear: "",
              },
            ])
          }
          className={classes.inputBox}
        >
          Add another institution details
        </Button>
      </Grid>
    </>
  );
};

const Login = (props) => {
  const classes = useStyles();
  const setPopup = useContext(SetPopupContext);
  const [otp, setotp] = useState("")
  const [code, setCode] = useState('')
  const [loggedin, setLoggedin] = useState(isAuth());

  const [signupDetails, setSignupDetails] = useState({
    type: "applicant",
    email: "",
    password: "",
    // cpassword:"",
    name: "",
    // education: [],
    // skills: [],
    // resume: "",
    // profile: "",
    // bio: "",
    contactNumber: ""
    
  });

  const [phone, setPhone] = useState("");

  const [education, setEducation] = useState([
    {
      institutionName: "",
      startYear: "",
      endYear: "",
    },
  ]);

  const [inputErrorHandler, setInputErrorHandler] = useState({
    email: {
      untouched: true,
      required: true,
      error: false,
      message: "",
    },
    password: {
      untouched: true,
      required: true,
      error: false,
      message: "",
    },
    // cpassword: {
    //   untouched: true,
    //   required: true,
    //   error: false,
    //   message: "",
    // },
    name: {
      untouched: true,
      required: true,
      error: false,
      message: "",
    },
  });

  const handleInput = (key, value) => {
    setSignupDetails({
      ...signupDetails,
      [key]: value,
    });
  };

  const handleInputError = (key, status, message) => {
    setInputErrorHandler({
      ...inputErrorHandler,
      [key]: {
        required: true,
        untouched: false,
        error: status,
        message: message,
      },
    });
  };

  const handleLogin = () => {
    const tmpErrorHandler = {};
    Object.keys(inputErrorHandler).forEach((obj) => {
      if (inputErrorHandler[obj].required && inputErrorHandler[obj].untouched) {
        tmpErrorHandler[obj] = {
          required: true,
          untouched: false,
          error: true,
          message: `${obj[0].toUpperCase() + obj.substr(1)} is required`,
        };
      } else {
        tmpErrorHandler[obj] = inputErrorHandler[obj];
      }
    });

    let updatedDetails = {
      ...signupDetails,
      // education: education
      //   .filter((obj) => obj.institutionName.trim() !== "")
      //   .map((obj) => {
      //     if (obj["endYear"] === "") {
      //       delete obj["endYear"];
      //     }
      //     return obj;
      //   }),  
    };
    if (phone !== "") {
      updatedDetails = {
        ...signupDetails,
        contactNumber: `+${phone}`,
      };
    } else {
      updatedDetails = {
        ...signupDetails,
        contactNumber: "",
      };
    }
    setSignupDetails(updatedDetails);

    const verified = !Object.keys(tmpErrorHandler).some((obj) => {
      return tmpErrorHandler[obj].error;
    });

    if (verified) {
      axios
        .post(apiList.signup, updatedDetails)
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("type", response.data.type);
          setLoggedin(isAuth());
          setPopup({
            open: true,
            severity: "success",
            message: "Logged in successfully",
          });
          console.log(response);
        })
        .catch((err) => {
          setPopup({
            open: true,
            severity: "error",
            message: err.response.data.err,
          });
          console.log(err.response);
        });
    } else {
      setInputErrorHandler(tmpErrorHandler);
      setPopup({
        open: true,
        severity: "error",
        message: "Incorrect Input",
      });
    }
  };
  // const[recaptcha , setRecaptcha] = useState(false);

  // const handleonRecaptcha = (value) => {
  //   // console.log("Captcha Value:", value);
  //   setRecaptcha(!recaptcha)
  // }

  const handleLoginRecruiter = () => {
    const tmpErrorHandler = {};
    Object.keys(inputErrorHandler).forEach((obj) => {
      if (inputErrorHandler[obj].required && inputErrorHandler[obj].untouched) {
        tmpErrorHandler[obj] = {
          required: true,
          untouched: false,
          error: true,
          message: `${obj[0].toUpperCase() + obj.substr(1)} is required`,
        };
      } else {
        tmpErrorHandler[obj] = inputErrorHandler[obj];
      }
    });

    let updatedDetails = {
      ...signupDetails,
    };
    if (phone !== "") {
      updatedDetails = {
        ...signupDetails,
        contactNumber: `+${phone}`,
      };
    } else {
      updatedDetails = {
        ...signupDetails,
        contactNumber: "",
      };
    }

    setSignupDetails(updatedDetails);

    const verified = !Object.keys(tmpErrorHandler).some((obj) => {
      return tmpErrorHandler[obj].error;
    });

console.log(updatedDetails)

    if (verified) {
      axios
        .post(apiList.signup, updatedDetails)
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("type", response.data.type);
          setLoggedin(isAuth());
          setPopup({
            open: true,
            severity: "success",
            message: "Logged in successfully",
          });
          console.log(response);
        })
        .catch((err) => {
          setPopup({
            open: true,
            severity: "error",
            message: err.response.data.message,
          });
          console.log(err.response);
        });
    } else {
      setInputErrorHandler(tmpErrorHandler);
      setPopup({
        open: true,
        severity: "error",
        message: "Incorrect Input",
      });
    }
  };

   // for setting the phone number 


useEffect(() => {
    setCode(otp)
}, [otp])

const [verify,setVerify] = useState(true)

   // sending otp to the client number
   const sendOTP = () => {
     console.log(phone)
    fetch(`http://localhost:4444/api/sendotp?phonenumber=${phone}&channel=sms`,
        {
            method: "get",

        }).then(res => res.json())
        .then(data => {
          console.log(data)
            if (data.error) {
                console.log(data.message)

            } else {
                // setResult(data.myposts)
                console.log(data.message)
                
                // console.log(data)
            }
        })
}


    // verifing the otp and the client number


    const validateOTP = () => {
      // console.log(code)
      // console.log(phonenumber)
      fetch(`http://localhost:4444/api/verifyotp?phonenumber=${phone}&code=${code}`,
          {
              method: "get",

          }).then(res => res.json())
          .then(data => {
              if (data.error) {
                  // console.log(`The given ${data.phonenumber} is ${data.message} `)
                      toast.error(data.error)
                      console.log(data.error)

              } else {
                  console.log(`The given ${phone} is ${data.message} `)
                  toast.success(data.message)
                  setVerify(!verify)
              }
             
          })
        
          
  }

const history = useHistory();

// google auth logic
const [showloginButton, setShowloginButton] = useState(true);
// const clientId = "71363042296-4kqs7oqffuojql8r5j5jhn36ugm4jo2b.apps.googleusercontent.com";
const [showlogoutButton, setShowlogoutButton] = useState(false);
const onLoginSuccess = (res) => {
    console.log('Login Success:', res.profileObj);
    setShowloginButton(!showloginButton);
    setShowlogoutButton(true);
    // history.push("/applications")
};
const onLoginFailure = (res) => {
    console.log('Login Failed:', res);
};
const onSignoutSuccess = () => {
    alert("You have been logged out successfully");
    console.clear();
    setShowloginButton(true);
    setShowlogoutButton(false);
};

  return loggedin ? (
    <Redirect to="/" />
  ) : (
    <Paper elevation={3} className={classes.body}>
      <Grid container 
       xs ={5}
     direction="column" 
     spacing={5} 
     alignItems="center" 
     justify = 'center' 
      style={{
        margin:"70px auto 50px auto",
        padding:"20px",
        boxShadow: "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)"
    }}>
        <Grid item>
          <Typography variant="h3" component="h2">
            Signup
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            select
            label="Category"
            variant="outlined"
            className={classes.inputBox}
            value={signupDetails.type}
            onChange={(event) => {
              handleInput("type", event.target.value);
            }}
          >
            <MenuItem value="applicant">Student</MenuItem>
            <MenuItem value="recruiter">Recruiter</MenuItem>
          </TextField>
        </Grid>
        <Grid item>
          <TextField
            label="Name"
            value={signupDetails.name}
            onChange={(event) => handleInput("name", event.target.value)}
            className={classes.inputBox}
            error={inputErrorHandler.name.error}
            helperText={inputErrorHandler.name.message}
            onBlur={(event) => {
              if (event.target.value === "") {
                handleInputError("name", true, "Name is required");
              } else {
                handleInputError("name", false, "");
              }
            }}
            variant="outlined"
          />
        </Grid>
        <Grid item>
          <EmailInput
            label="Email"
            value={signupDetails.email}
            onChange={(event) => handleInput("email", event.target.value)}
            inputErrorHandler={inputErrorHandler}
            handleInputError={handleInputError}
            className={classes.inputBox}
            required={true}
          
          />
        </Grid>
        <Grid item style={{position:'relative'}}>
            
             <PhoneInput
              inputStyle={{width:"400px"}}
              country={"in"}
              value={phone}
              onChange={(phone) => setPhone(phone)}
            />
            
           
              {
                phone.length > 2 ?
                <button  data-toggle="modal" data-target="#exampleModalCenter" type="button" className={`btn btn-primary ${classes.inputIcon}`} onClick={() => sendOTP()}>Verify</button>
                :null
                // <button  type="button" className={`btn btn-primary ${classes.inputIcon}`} >Verified</button>
              }
            </Grid>
              <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLongTitle">Reset Your Account Password</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                        <div class="modal-body">
                        <div class="  text-center">
                        <h6>Please enter the one time password <br /> to verify your account</h6>
                        {/* <div> <span>A code has been sent to</span> <small>*******9897</small> </div> */}
                        <div id="otp" class="inputs d-flex flex-row justify-content-center mt-4">
                            <input type="text" className="form-control w-50" id="exampleInputName"  placeholder="Enter OTP" maxLength="6" onChange={(e) => setotp(e.target.value)}/>
                        </div>
                        <div> <button type='button' class="btn btn-danger px-4 validate mt-4"  aria-label="Close"  data-dismiss="modal" onClick={() =>{ validateOTP()}} >Validate</button> </div>
                    </div>
                    <div class="card-2 mt-3">
                        <div class="content d-flex justify-content-center align-items-center"> <span>Didn't get the code</span> <a href="#" class="text-decoration-none ms-3"> Resend</a> </div>
                    </div>
                     
                    </div>
                  </div>
                </div>
              </div>
        <Grid item>
          <PasswordInput
            label="Password"
            value={signupDetails.password}
            onChange={(event) => handleInput("password", event.target.value)}
            className={classes.inputBox}
            error={inputErrorHandler.password.error}
            helperText={inputErrorHandler.password.message}
            onBlur={(event) => {
              if (event.target.value === "") {
                handleInputError("password", true, "Password is required");
              } else {
                handleInputError("password", false, "");
              }
            }}
          />
        </Grid>
        {/* <Grid item>
          <PasswordInput
            labelWidth={props.labelWidth ? props.labelWidth : 130}
            label="Confirm Password"
            value={signupDetails.cpassword}
            onChange={(event) => handleInput("cpassword", event.target.value)}
            className={classes.inputBox}
            error={inputErrorHandler.cpassword.error}
            helperText={inputErrorHandler.cpassword.message}
            onBlur={(event) => {
              if (event.target.value === "") {
                handleInputError("cpassword", true, "Confirm Password is required");
              }else if(signupDetails.password !== signupDetails.cpassword){
                return handleInputError ("cpassword", true, "password should match");
              } 
              else {
                handleInputError("cpassword", false, "");
              }
            }}
            
          />
          
        </Grid> */}
        {signupDetails.type === "applicant" ? (
          <>
            {/* <MultifieldInput
              education={education}
              setEducation={setEducation}
            />
            <Grid item>
              <ChipInput
                className={classes.inputBox}
                label="Skills"
                variant="outlined"
                helperText="Press enter to add skills"
                onChange={(chips) =>
                  setSignupDetails({ ...signupDetails, skills: chips })
                }
              />
            </Grid>
            <Grid item>
              <FileUploadInput
                className={classes.inputBox}
                label="Resume (.pdf)"
                icon={<DescriptionIcon />}
                // value={files.resume}
                // onChange={(event) =>
                //   setFiles({
                //     ...files,
                //     resume: event.target.files[0],
                //   })
                // }
                uploadTo={apiList.uploadResume}
                handleInput={handleInput}
                identifier={"resume"}
              />
            </Grid>
            <Grid item>
              <FileUploadInput
                className={classes.inputBox}
                label="Profile Photo (.jpg/.png)"
                icon={<FaceIcon />}
                // value={files.profileImage}
                // onChange={(event) =>
                //   setFiles({
                //     ...files,
                //     profileImage: event.target.files[0],
                //   })
                // }
                uploadTo={apiList.uploadProfileImage}
                handleInput={handleInput}
                identifier={"profile"}
              />
            </Grid> */}
          </>
        ) : (
          <>
            {/* <Grid item style={{ width: "100%" }}>
              <TextField
                label="Bio (upto 250 words)"
                multiline
                rows={8}
                style={{ width: "100%" }}
                variant="outlined"
                value={signupDetails.bio}
                onChange={(event) => {
                  if (
                    event.target.value.split(" ").filter(function (n) {
                      return n != "";
                    }).length <= 250
                  ) {
                    handleInput("bio", event.target.value);
                  }
                }}
              />
            </Grid>
            <Grid item>
            <Typography >{"Please Upload Your Company Logo"}</Typography >
              <FileUploadInput
                className={classes.inputBox}
                label="Profile Photo (.jpg/.png)"
                icon={<FaceIcon />}
                // value={files.profileImage}
                // onChange={(event) =>
                //   setFiles({
                //     ...files,
                //     profileImage: event.target.files[0],
                //   })
                // }
                uploadTo={apiList.uploadProfileImage}
                handleInput={handleInput}
                identifier={"profile"}
              />
            </Grid> */}
          </>
        )}
        {/* <ReCAPTCHA
       sitekey = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
       onChange ={handleonRecaptcha}
       /> */}
       {/* google authentication starts */}
      {/* <Grid item >
        <Button>
            { showloginButton ?
                <GoogleLogin
                    clientId="71363042296-4kqs7oqffuojql8r5j5jhn36ugm4jo2b.apps.googleusercontent.com"
                    buttonText="Sign In"
                    onSuccess={onLoginSuccess}
                    onFailure={onLoginFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                /> : null}
            { showlogoutButton ?
                <GoogleLogout
                    clientId="71363042296-4kqs7oqffuojql8r5j5jhn36ugm4jo2b.apps.googleusercontent.com"
                    buttonText="Sign Out"
                    onLogoutSuccess={onSignoutSuccess}
                >
                </GoogleLogout> : null
             }
            </Button>
        </Grid> */}
        {/* google auth ends */}
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              signupDetails.type === "applicant"
                ? handleLogin()
                : handleLoginRecruiter();
            }}
            className={classes.submitButton}
            // disabled={!recaptcha}
          >
            Signup
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Login;

// {/* <Grid item>
//           <PasswordInput
//             label="Re-enter Password"
//             value={signupDetails.tmpPassword}
//             onChange={(event) => handleInput("tmpPassword", event.target.value)}
//             className={classes.inputBox}
//             labelWidth={140}
//             helperText={inputErrorHandler.tmpPassword.message}
//             error={inputErrorHandler.tmpPassword.error}
//             onBlur={(event) => {
//               if (event.target.value !== signupDetails.password) {
//                 handleInputError(
//                   "tmpPassword",
//                   true,
//                   "Passwords are not same."
//                 );
//               }
//             }}
//           />
//         </Grid> */}
