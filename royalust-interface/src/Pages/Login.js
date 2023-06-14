import React from "react";
import { useState, useContext } from "react";
import config from "../Config/Config";
import { generateHash } from "../Utils/hash";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import AuthenticatedContext from "../Middleware/authenticatedContext";
import Register from "./Register";
import ChangePassword from "./ChangePassword";

const login = async (setAuthenticated, username, password) => {
	if (username && password) {
		let pass_hash = await generateHash(password);
		let login_res = await axios.post(`${config.server}/login`, {
			username,
			pass_hash,
		});
		if (login_res.data.authenticated) {
			setAuthenticated(login_res.data.token);
			localStorage.setItem("username", username);
			localStorage.setItem("j-token", login_res.data.token);
			localStorage.setItem("r-token", login_res.data.refresh);
		}
	}
};

const Login = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [register, setRegister] = useState(false);
	const [changePass, setChangePass] = useState(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const { authenticated, setAuthenticated } = useContext(AuthenticatedContext);
	return register ? (
		<Register setRegister={setRegister} />
	) : changePass ? (
		<ChangePassword setChangePass={setChangePass} />
	) : (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-evenly",
				alignItems: "center",
				marginTop: "2rem",
				height: "30rem",
			}}>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					flexDirection: "column",
					height: "10rem",
				}}>
				<TextField
					label="Username"
					onChange={(event) => {
						setUsername(event.target.value);
					}}
				/>

				<TextField
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
			</div>
			<div style={{ marginTop: "2rem" }}>
				<Button
					variant="contained"
					onClick={() => login(setAuthenticated, username, password)}>
					Login
				</Button>
			</div>
			<div style={{ marginTop: "2rem" }}>
				<Button variant="contained" onClick={() => setRegister(true)}>
					Create New User
				</Button>
			</div>
			<div style={{ marginTop: "2rem" }}>
				<Button variant="contained" onClick={() => setChangePass(true)}>
					Forgot Password
				</Button>
			</div>
		</div>
	);
};

export default Login;
