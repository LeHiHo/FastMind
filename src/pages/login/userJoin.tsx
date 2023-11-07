import React, { useState } from 'react';
import { signup } from '../../api/index';
import { useNavigate } from 'react-router-dom';
const userJoin = () => {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [picture, setPicture] = useState('가을.jpg');

  const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const onChangePicture = (e: React.ChangeEvent<any>) => {
    const selectedFile = e.target.files[0];
    setPicture(selectedFile);
  };
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const check = await signup(id, password, name, picture);
    if (check === undefined) {
      alert('중복된 아이디가 있습니다.');
    } else {
      alert('회원가입 성공.');
      navigate('/');
    }
  };

  return (
    <>
      <div>Signup</div>
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
        <label>name</label>
        <input
          type="text"
          placeholder="plz insert name"
          value={name}
          onChange={onChangeName}
        />
        <label>picture</label>
        <input type="file" onChange={onChangePicture} />
        <button type="submit">sign up</button>
      </form>
    </>
  );
};

export default userJoin;
