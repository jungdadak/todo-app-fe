import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import api from '../utils/api';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/user/login', { email, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        alert('로그인 성공!');
        navigate('/');
      }
    } catch (error) {
      alert('로그인 실패: 이메일 또는 비밀번호를 확인해주세요.');
    }
  };

  return (
    <div className="display-center w-[50vw] mx-auto mt-[20vh] border-white border-2 p-3 rounded-lg text-yellow-300">
      <Form className="login-box" onSubmit={handleLogin}>
        <h1 className="text-white">로그인</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div className="button-box">
          <Button type="submit" className="button-primary">
            Login
          </Button>
          <span className="flex justify-end">
            계정이 없다면?{' '}
            <Link to="/register">
              <span className="text-red-400 font-bold"> 회원가입 하기</span>
            </Link>
          </span>
        </div>
      </Form>
    </div>
  );
};

export default LoginPage;
