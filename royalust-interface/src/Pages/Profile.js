import React from "react";
import { useState, useEffect, useContext } from "react";
import config from "../Config/Config";
import { generateHash } from "../Utils/hash";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import AuthenticatedContext from "../Middleware/authenticatedContext";

const editProfile = async (
	username,
	email,
	phone,
	addressInput,
	jobType,
	invalidEmail,
	invalidJobType,
	invalidPhone
) => {
	if (!(invalidEmail || invalidJobType || invalidPhone)) {
		let address = addressInput.replace(/(\r\n|\n|\r)/gm, " ");
		if (username && email && phone && addressInput && jobType) {
			let edit_res = await axios.put(
				`${config.server}/users/update`,
				{ username, email, phone, address, jobType },
				{
					headers: {
						Authorization:
							"Bearer " + localStorage.getItem("j-token"),
					},
				}
			);
		}
	}
};

const getUserDetails = async (
	setUsername,
	setEmail,
	setPhone,
	setAddress,
	setJobType,
	setAuthenticated
) => {
	await checkToken(setAuthenticated);
	let username = localStorage.getItem("username");
	let user_details = await axios.get(
		`${config.server}/users/details?username=${localStorage.getItem(
			"username"
		)}`,
		{
			headers: {
				Authorization: "Bearer " + localStorage.getItem("j-token"),
			},
		}
	);
	setUsername(username);
	setEmail(user_details.data.email);
	setPhone(user_details.data.phone);
	setAddress(user_details.data.address);
	setJobType(user_details.data.job_type);
	setAuthenticated(localStorage.getItem("j-token"));
};

const logout = async (setAuthenticated) => {
	await axios.post(`${config.server}/logout`, {
		token: localStorage.getItem("r-token"),
	});
	setAuthenticated(null);
	localStorage.clear();
};

const checkToken = async (setAuthenticated) => {
	let tokenCheck = await axios.get(`${config.server}/check_session`, {
		headers: {
			Authorization: "Bearer " + localStorage.getItem("j-token"),
		},
	});
	if (tokenCheck.data.renew) {
		let newTokenCall = await axios.post(`${config.server}/token`, {
			token: localStorage.getItem("r-token"),
		});
		localStorage.setItem("j-token", newTokenCall.data.token);
		if (newTokenCall.data.logout) {
			logout(setAuthenticated);
		}
	}
};

const Profile = (props) => {
	const { authenticated, setAuthenticated } =
		useContext(AuthenticatedContext);

	// const [showPassword, setShowPassword] = useState(false);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [address, setAddress] = useState("");
	const [phone, setPhone] = useState("");
	const [jobType, setJobType] = useState("");
	const [usernameEdit, setUsernameEdit] = useState(false);
	const [emailEdit, setEmailEdit] = useState(false);
	const [addressEdit, setAddressEdit] = useState(false);
	const [phoneEdit, setPhoneEdit] = useState(false);
	const [jobTypeEdit, setJobTypeEdit] = useState(false);
	const [invalidEmail, setInvalidEmail] = useState(false);
	const [invalidJobType, setInvalidJobType] = useState(false);
	const [invalidPhone, setInvalidPhone] = useState(false);

	useEffect(() => {
		getUserDetails(
			setUsername,
			setEmail,
			setPhone,
			setAddress,
			setJobType,
			setAuthenticated
		);
		return () => {};
	}, []);

	useEffect(() => {
		if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g) && email) {
			setInvalidEmail(true);
		} else {
			setInvalidEmail(false);
		}
	}, [email]);

	useEffect(() => {
		if (
			jobType &&
			!jobType.match(/\b(?:Full time|Part time|Contract)\b/gi)
		) {
			setInvalidJobType(true);
		} else {
			setInvalidJobType(false);
		}
	}, [jobType]);

	useEffect(() => {
		if (
			!phone.match(
				/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/gm
			) &&
			phone
		) {
			setInvalidPhone(true);
		} else {
			setInvalidPhone(false);
		}
	}, [phone]);

	useEffect(() => {
		const checkTokenInterval = setInterval(() => {
			checkToken(setAuthenticated);
		}, 5000);
		return () => {
			clearInterval(checkTokenInterval);
		};
	}, []);

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
			<h1>Profile</h1>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					flexDirection: "column",
					height: "30rem",
				}}>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
					}}>
					<TextField
						InputProps={{
							readOnly: !usernameEdit,
						}}
						label="Username"
						value={username}
						onChange={(event) => {
							setUsername(event.target.value);
						}}
					/>
					<EditIcon
						style={{ marginLeft: "1rem", color: "#00000000" }}
					/>
				</div>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
					}}>
					<TextField
						error={invalidEmail}
						InputProps={{
							readOnly: !emailEdit,
						}}
						label="E-Mail"
						value={email}
						onChange={(event) => {
							setEmail(event.target.value);
						}}
					/>
					<EditIcon
						onClick={() => setEmailEdit(!emailEdit)}
						style={{ marginLeft: "1rem", cursor: "pointer" }}
						sx={
							emailEdit
								? { color: "#cc0000" }
								: { color: "#00bb00" }
						}
					/>
				</div>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
					}}>
					<TextField
						error={invalidPhone}
						InputProps={{
							readOnly: !phoneEdit,
						}}
						label="Phone"
						value={phone}
						onChange={(event) => {
							setPhone(event.target.value);
						}}
					/>
					<EditIcon
						onClick={() => setPhoneEdit(!phoneEdit)}
						style={{ marginLeft: "1rem", cursor: "pointer" }}
						sx={
							phoneEdit
								? { color: "#cc0000" }
								: { color: "#00bb00" }
						}
					/>
				</div>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
					}}>
					<TextField
						InputProps={{
							readOnly: !addressEdit,
						}}
						label="Address"
						value={address}
						onChange={(event) => {
							setAddress(event.target.value);
						}}
						multiline
						maxRows={5}
					/>
					<EditIcon
						onClick={() => setAddressEdit(!addressEdit)}
						style={{ marginLeft: "1rem", cursor: "pointer" }}
						sx={
							addressEdit
								? { color: "#cc0000" }
								: { color: "#00bb00" }
						}
					/>
				</div>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
					}}>
					<TextField
						error={invalidJobType}
						InputProps={{
							readOnly: !jobTypeEdit,
						}}
						label="Job Type"
						value={jobType}
						onChange={(event) => {
							setJobType(event.target.value);
						}}
						helperText="Full time, Part time or Contract"
					/>
					<EditIcon
						onClick={() => setJobTypeEdit(!jobTypeEdit)}
						style={{ marginLeft: "1rem", cursor: "pointer" }}
						sx={
							jobTypeEdit
								? { color: "#cc0000" }
								: { color: "#00bb00" }
						}
					/>
				</div>
			</div>
			<div style={{ marginTop: "2rem" }}>
				<Button
					variant="contained"
					onClick={() =>
						editProfile(
							username,
							email,
							phone,
							address,
							jobType,
							invalidEmail,
							invalidJobType,
							invalidPhone
						)
					}>
					Save Changes
				</Button>
			</div>
			<div style={{ marginTop: "2rem" }}>
				<Button
					variant="contained"
					style={{ backgroundColor: "#cc0000" }}
					onClick={() => {
						logout(setAuthenticated);
					}}>
					Log Out
				</Button>
			</div>
		</div>
	);
};

export default Profile;
