import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('authToken', data.token);  // ✅ Store token as 'authToken'
        navigate('/admin/dashboard');  // Redirect after login
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  return (
    <Wrapper>
      <Form onSubmit={handleLogin}>
        <h2>Admin Login</h2>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <Button type="submit">Login</Button>
        {error && <Error>{error}</Error>}
      </Form>
    </Wrapper>
  );
};

export default Login;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #0a0a12;
`;

const Form = styled.form`
  background: #1a1a1f;
  padding: 2rem;
  border-radius: 8px;
  width: 320px;
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.7rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
`;

const Button = styled.button`
  background: #ffcc00;
  color: black;
  padding: 0.7rem;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const Error = styled.p`
  color: red;
  margin-top: -0.5rem;
  font-size: 0.9rem;
`;
