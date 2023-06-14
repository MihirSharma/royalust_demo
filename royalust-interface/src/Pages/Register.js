import React from 'react'
import { useState, useEffect} from 'react';
import config from '../Config/Config';
import { generateHash } from '../Utils/hash';
import axios from "axios";
import TextField from '@mui/material/TextField';
import { Button, Tooltip } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const register = async(username, password, email, phone, addressInput, job_type_input, props, setInvalidUsername) =>{
    let address = addressInput.replace(/(\r\n|\n|\r)/gm, " ");
    let job_type = job_type_input.toLowerCase();
    if(username && password && email && phone && addressInput && job_type){
      let pass_hash = await generateHash(password);
      let signup_res = await axios.post(`${config.server}/signup`, {username, pass_hash, email, phone, address, job_type});
      if(signup_res.data.username){
          props.setRegister(false);
      }
    }
  
  }

  
  const Register = (props) => {
      const [showPassword, setShowPassword] = useState(false);
      const [username, setUsername] = useState("");
      const [email, setEmail] = useState("");
      const [address, setAddress] = useState("");
      const [phone, setPhone] = useState("");
      const [jobType, setJobType] = useState("");
      const [password, setPassword] = useState("");
      const [invalidUsername, setInvalidUsername] = useState(false)
      const [invalidEmail, setInvalidEmail] = useState(false)
      const [invalidJobType, setInvalidJobType] = useState(false)
      const [invalidPassword, setInvalidPassword] = useState(false)
      const [invalidPhone, setInvalidPhone] = useState(false)
    ///^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/gm


      const handleClickShowPassword = () => setShowPassword((show) => !show);

    useEffect(() => {
        if(!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g) && email){
            setInvalidEmail(true)
          }else{
            setInvalidEmail(false)
          }
      }, [email]);

      useEffect(() => {
        if(jobType && (!jobType.match(/\b(?:Full time|Part time|Contract)\b/gi))){
            setInvalidJobType(true)
          }else{
            setInvalidJobType(false)
          }
      }, [jobType]);

      useEffect(() => {
        if(!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/g) && password){
            setInvalidPassword(true)
          }else{
            setInvalidPassword(false)
          }
      }, [password]);

      useEffect(() => {
        if(!phone.match(/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/gm) && phone){
            setInvalidPhone(true)
          }else{
            setInvalidPhone(false)
          }
      }, [phone]);

    return (
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: "space-evenly", alignItems: "center", marginTop: "2rem", height: "50rem"}}>
        <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center", flexDirection: 'column', height: "30rem"}}>

        <TextField
            label="Username"
            onChange={(event) => {
                setUsername(event.target.value);
            }}
        />
        <Tooltip title="10 characters with at least one special character, one number, one lowercase letter and one uppercase letter">
        <TextField
            error = {invalidPassword}
            label="Password"
            type={showPassword?"text":'password'}
            onChange={(event) => {
                setPassword(event.target.value);
            }}
            InputProps={{
                endAdornment: <InputAdornment position="end">{showPassword?<VisibilityOff onClick = {handleClickShowPassword}/>:<Visibility onClick = {handleClickShowPassword}/>}</InputAdornment>,
            }}
            />
        </Tooltip>
        <TextField
            error={invalidEmail}
            label="E-Mail"
            onChange={(event) => {
                setEmail(event.target.value);
            }}
            helperText = "Must be a valid E-mail ID"
        />
        <TextField
            error={invalidPhone}
            label="Phone"
            onChange={(event) => {
                setPhone(event.target.value);
            }}
        />
        <TextField
            label="Address"
            onChange={(event) => {
                setAddress(event.target.value);
            }}
            multiline
            maxRows={5}
        />
        <Tooltip title="Full time, Part time or Contract">
        <TextField
            error={invalidJobType}
            label="Job Type"
            onChange={(event) => {
                setJobType(event.target.value);
            }}
            helperText = "Full time, Part time or Contract"
            />
        </Tooltip>
        </div>
        <div style={{marginTop: "2rem"}}>
        <Button variant="contained" onClick = {()=>register(username, password, email, phone, address, jobType, props, setInvalidUsername)}>Register</Button>
        </div>
        <div style={{marginTop: "1rem"}}>
        <Button variant="contained" onClick = {()=>props.setRegister(false)}>Return to Login</Button>
        </div>
    </div>
    )
}

export default Register