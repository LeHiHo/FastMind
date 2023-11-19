import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createGameRooms } from '../../../api';
import { useRecoilState } from 'recoil';
import { allRoomState } from '../../../states/atom';
import swal from 'sweetalert';

const CreateGameRoom = () => {
  const [allRooms, setAllRooms] = useRecoilState(allRoomState);
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  const onChange = (e: React.ChangeEvent<any>) => {
    const { value } = e.target;
    setIsPrivate(value === 'Private');
  };

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const check = await createGameRooms(name, [], isPrivate);
    if (check !== undefined) {
      setAllRooms((prevRooms) => [...prevRooms, check]);
      navigate(`/room/:${check.id}`);
      swal({ title: '방 생성 성공', icon: 'success' });
    } else {
      swal({ title: '중복된 방이 있습니다.', icon: 'error' });

      setAllRooms([...allRooms, check]);
      navigate(`/room/${check.id}`);
    }
  };

  return (
    <>
      <div> CreateGameRoom</div>
      <form onSubmit={submit}>
        <label>name</label>
        <input
          type="text"
          placeholder="plz insert name"
          value={name}
          onChange={onChangeName}
        />
        <label>isPrivate</label>
        <select name="isPrivate" onChange={onChange}>
          <option value="UnPrivate">UnPrivate</option>
          <option value="Private">Private</option>
        </select>
        <button type="submit">create Room!</button>
      </form>
    </>
  );
};

export default CreateGameRoom;
