import React, { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(null);
  const [password, setPassword] = useState('');
  const [checkpw, setCheckpw] = useState('');
  const [doPasswordsMatch, setDoPasswordsMatch] = useState(null);

  // Ref for the name input to apply animation
  const nameRef = useRef(null);

  const handleNameChange = (e) => {
    const newName = e.target.value;
    if (newName.length <= 50) {
      // 이름 길이 제한 (최대 50자)
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
    // 이메일 유효성 검사 (간단한 정규식 사용)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email) && email.length <= 100; // 길이 제한 (최대 100자)
    setEmailValid(isValid);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    if (newPassword.length <= 30) {
      // 비밀번호 길이 제한 (최대 30자)
      setPassword(newPassword);
      // 비밀번호가 변경되면 비밀번호 확인 상태를 초기화
      setDoPasswordsMatch(null);
    }
  };

  const handleCheckpwChange = (e) => {
    const newCheckpw = e.target.value;
    if (newCheckpw.length <= 30) {
      // 비밀번호 확인 길이 제한 (최대 30자)
      setCheckpw(newCheckpw);
      // 비밀번호 확인 입력 시 상태 업데이트
      if (newCheckpw.length === 0) {
        setDoPasswordsMatch(null);
      } else {
        setDoPasswordsMatch(newCheckpw === password);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 현재는 로직 없이 스타일만 적용
    alert('회원가입 완료!');
  };

  const triggerFranticFlash = () => {
    if (nameRef.current) {
      // 애니메이션 클래스를 제거
      nameRef.current.classList.remove('animate-franticFlash');
      // Reflow를 강제로 발생시켜 애니메이션을 재실행
      void nameRef.current.offsetWidth;
      // 애니메이션 클래스 재추가
      nameRef.current.classList.add('animate-franticFlash');
    }
  };

  // 모든 필드가 유효한지 확인
  const isFormValid = () => {
    return (
      name.trim() !== '' &&
      emailValid === true &&
      password.trim() !== '' &&
      doPasswordsMatch === true
    );
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Form
        className="login-box w-full max-w-md p-8 bg-white rounded shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-center mb-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 bg-clip-text text-transparent inline-block">
            어서오세요
          </h1>
        </div>

        {/* Name Field */}
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label htmlFor="nameInput">Name</Form.Label>
          <Form.Control
            ref={nameRef}
            id="nameInput"
            type="text"
            placeholder="Name"
            value={name}
            onChange={handleNameChange}
            maxLength={15} // 최대 50자
            className="transition duration-300 ease-in-out"
            aria-label="Name"
          />
          {name.length === 15 && (
            <Form.Text className="text-gray-500">
              김수한무거북이와두루미
            </Form.Text>
          )}
        </Form.Group>

        {/* Email Field */}
        <Form.Group className="mb-3" controlId="formBasicEmail">
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
                  ? 'border-green-500'
                  : 'border-red-500'
                : ''
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
            <Form.Text className="text-red-500">
              그런 이메일이 어디있냐
            </Form.Text>
          )}
        </Form.Group>

        {/* Password Field */}
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label htmlFor="passwordInput">Password</Form.Label>
          <Form.Control
            id="passwordInput"
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            maxLength={10} // 최대 30자
            className="transition duration-300 ease-in-out"
            aria-label="Password"
          />
          {password.length === 10 && (
            <Form.Text className="text-gray-500">
              10글자까지 가능합니다
            </Form.Text>
          )}
        </Form.Group>

        {/* Password Confirmation Field */}
        <Form.Group className="mb-3" controlId="formBasicPasswordConfirm">
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
                ? 'border-red-500'
                : doPasswordsMatch === true
                ? 'border-green-500'
                : ''
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
