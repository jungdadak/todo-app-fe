import React, { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import api from "../utils/api";

const RegisterPage = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [emailValid, setEmailValid] = useState(null);
	const [password, setPassword] = useState("");
	const [checkpw, setCheckpw] = useState("");
	const [doPasswordsMatch, setDoPasswordsMatch] = useState(null);
	const navigate = useNavigate();
	const nameRef = useRef(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!isFormValid()) return;

		try {
			await api.post("/user", { name, email, password });
			alert("회원가입 완료!");
			navigate("/login"); // 회원가입 후 로그인 페이지로 이동
		} catch (error) {
			alert(error.message);
		}
	};

	const handleNameChange = (e) => {
		const newName = e.target.value;
		if (newName.length <= 50) {
			setName(newName);
			triggerFranticFlash();
		}
	};

	const handleEmailChange = (e) => {
		const newEmail = e.target.value;
		setEmail(newEmail);
		validateEmail(newEmail);
	};

	const validateEmail = (email) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		const isValid = emailRegex.test(email) && email.length <= 30;
		setEmailValid(isValid);
	};

	const handlePasswordChange = (e) => {
		const newPassword = e.target.value;
		if (newPassword.length <= 30) {
			setPassword(newPassword);
			setDoPasswordsMatch(null);
		}
	};

	const handleCheckpwChange = (e) => {
		const newCheckpw = e.target.value;
		if (newCheckpw.length <= 30) {
			setCheckpw(newCheckpw);
			if (newCheckpw.length === 0) {
				setDoPasswordsMatch(null);
			} else {
				setDoPasswordsMatch(newCheckpw === password);
			}
		}
	};

	const triggerFranticFlash = () => {
		if (nameRef.current) {
			nameRef.current.classList.remove("animate-franticFlash");
			void nameRef.current.offsetWidth;
			nameRef.current.classList.add("animate-franticFlash");
		}
	};

	const isFormValid = () => {
		return (
			name.trim() !== "" &&
			emailValid === true &&
			password.trim() !== "" &&
			doPasswordsMatch === true
		);
	};

	return (
		<div className="flex justify-center items-center min-h-screen bg-gray-100">
			<Form
				className="login-box w-full max-w-md p-8 bg-white rounded shadow-md"
				onSubmit={handleSubmit}
			>
				<Link to="/">홈으로</Link>
				<div className="flex justify-center mb-6">
					<h1 className="text-4xl font-bold bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 bg-clip-text text-transparent inline-block">
						어서오세요
					</h1>
				</div>

				{/* Name Field */}
				<Form.Group className="mb-3">
					<Form.Label htmlFor="nameInput">Name</Form.Label>
					<Form.Control
						ref={nameRef}
						id="nameInput"
						type="text"
						placeholder="Name"
						value={name}
						onChange={handleNameChange}
						maxLength={15}
						className="transition duration-300 ease-in-out"
						aria-label="Name"
					/>
					{name.length >= 15 && (
						<Form.Text className="text-gray-500 text-red-300">
							김수한무거북이와두루미
						</Form.Text>
					)}
				</Form.Group>

				{/* Email Field */}
				<Form.Group className="mb-3">
					<Form.Label htmlFor="emailInput">Email address</Form.Label>
					<Form.Control
						id="emailInput"
						type="email"
						placeholder="Enter email"
						value={email}
						onChange={handleEmailChange}
						maxLength={25}
						className={`transition duration-300 ease-in-out ${
							email.length > 0
								? emailValid
									? "border-green-500"
									: "border-red-500"
								: ""
						}`}
						aria-label="Email address"
					/>
					{email.length > 0 && !emailValid && (
						<Form.Text className="text-red-500">
							유효한 이메일 주소를 입력해주세요.
						</Form.Text>
					)}
					{email.length > 0 && emailValid && (
						<Form.Text className="text-green-500">
							유효한 이메일 주소입니다.
						</Form.Text>
					)}
					{email.length > 25 && (
						<Form.Text className="text-red-500">그런 이메일이 어디있냐</Form.Text>
					)}
				</Form.Group>

				{/* Password Field */}
				<Form.Group className="mb-3">
					<Form.Label htmlFor="passwordInput">Password</Form.Label>
					<Form.Control
						id="passwordInput"
						type="password"
						placeholder="Password"
						value={password}
						onChange={handlePasswordChange}
						maxLength={20}
						className="transition duration-300 ease-in-out"
						aria-label="Password"
					/>
					{password.length > 20 && (
						<Form.Text className="text-gray-500">20글자까지 가능합니다</Form.Text>
					)}
				</Form.Group>

				{/* Password Confirm Field */}
				<Form.Group className="mb-3">
					<div className="flex items-center gap-4 mb-2">
						<Form.Label htmlFor="checkpwInput">Re-enter Password</Form.Label>
						{doPasswordsMatch === true && (
							<div className="font-bold text-green-400">참 잘했어요</div>
						)}
						{doPasswordsMatch === false && (
							<div className="font-bold text-red-400">음..</div>
						)}
					</div>
					<Form.Control
						id="checkpwInput"
						type="password"
						placeholder="Re-enter Password"
						value={checkpw}
						onChange={handleCheckpwChange}
						maxLength={30} // 최대 30자
						className={`transition duration-300 ease-in-out ${
							doPasswordsMatch === false
								? "border-red-500"
								: doPasswordsMatch === true
								? "border-green-500"
								: ""
						}`}
						aria-label="Re-enter Password"
					/>
				</Form.Group>

				{/* Submit Button */}
				{isFormValid() && (
					<Button
						className="button-primary w-full mt-4 animate-moveLeftRight"
						type="submit"
					>
						회원가입
					</Button>
				)}
			</Form>
		</div>
	);
};

export default RegisterPage;
