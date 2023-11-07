import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/index';
const userLogin = () => {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const check = await login(id, password);
    if (check !== undefined) {
      alert('아이디나 비밀번호 다시 쳐주세요');
    } else {
      alert('로그인 성공.');
      navigate('/lobby');
    }
  };

  const navigateToSignup = () => {
    navigate('/join');
  };

  return (
    <>
      <div>Login</div>
      <form onSubmit={submit}>
        <label>id</label>
        <input
          type="text"
          placeholder="plz insert id"
          value={id}
          onChange={onChangeId}
        />
        <label>password</label>
        <input
          type="password"
          placeholder="plz insert password"
          value={password}
          onChange={onChangePassword}
        />

        <button type="submit">Log in</button>
        <br></br>
        <button onClick={navigateToSignup}>go to signup</button>
      </form>
    </>
  );
};

export default userLogin;
