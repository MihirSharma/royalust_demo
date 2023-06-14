import React from "react";
import { useState, useEffect } from "react";
import config from "../Config/Config";
import { generateHash } from "../Utils/hash";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const changePass = async (username, password, email, phone, props) => {
	if (username && password && email && phone) {
		let pass_hash = await generateHash(password);
		let change_pass_res = await axios.put(`${config.server}/change_password`, {
			username,
			pass_hash,
			email,
			phone,
		});
		props.setChangePass(false);
	}
};

const ChangePassword = (props) => {
	const [showPassword, setShowPassword] = useState(false);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [address, setAddress] = useState("");
	const [phone, setPhone] = useState("");
	const [password, setPassword] = useState("");
	const [invalidPassword, setInvalidPassword] = useState(false);

	useEffect(() => {
		if (
			!password.match(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/g
			) &&
			password
		) {
			setInvalidPassword(true);
		} else {
			setInvalidPassword(false);
		}
	}, [password]);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-evenly",
				alignItems: "center",
				marginTop: "2rem",
				height: "50rem",
			}}>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					flexDirection: "column",
					height: "30rem",
				}}>
				<TextField
					label="Username"
					onChange={(event) => {
						setUsername(event.target.value);
					}}
				/>
				<TextField
					error={invalidPassword}
					label="Password"
					type={showPassword ? "text" : "password"}
					onChange={(event) => {
						setPassword(event.target.value);
					}}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								{showPassword ? (
									<VisibilityOff onClick={handleClickShowPassword} />
								) : (
									<Visibility onClick={handleClickShowPassword} />
								)}
							</InputAdornment>
						),
					}}
				/>
				<TextField
					label="E-Mail"
					onChange={(event) => {
						setEmail(event.target.value);
					}}
				/>
				<TextField
					label="Phone"
					onChange={(event) => {
						setPhone(event.target.value);
					}}
				/>
			</div>
			<div style={{ marginTop: "2rem" }}>
				<Button
					variant="contained"
					onClick={() => changePass(username, password, email, phone, props)}>
					Change Password
				</Button>
			</div>
			<div style={{ marginTop: "1rem" }}>
				<Button variant="contained" onClick={() => props.setChangePass(false)}>
					Return to Login
				</Button>
			</div>
		</div>
	);
};

export default ChangePassword;
