import { auth } from '../firebaseUtils/config';
import { loginDB } from '../firebaseUtils/authUtils';
import { useState } from 'react';
import { logInAction } from 'redux/userSlice';
import { useDispatch } from 'react-redux';

export const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const onChangeHandler = e => {
    e.preventDefault();
    const inputName = e.target.name;

    switch (inputName) {
      case 'email':
        setEmail(e.target.value);
        break;
      case 'password':
        setPassword(e.target.value);
        break;
      default:
        break;
    }
  };
  const onSubmitHandler = async e => {
    e.preventDefault();

    const userData = await loginDB({ email, password });
    if (!userData) {
      return;
    }

    const updatedUser = await auth.currentUser;
    const user = {
      name: updatedUser.displayName,
      email: updatedUser.email,
      photoURL: updatedUser.photoURL,
      id: updatedUser.uid,
    };
    console.log('currentUser', user);
    dispatch(logInAction({ user }));
  };

  return (
    <>
      <form onSubmit={onSubmitHandler}>
        <input
          name="email"
          type="email"
          placeholder="Email..."
          value={email}
          autoComplete="off"
          onChange={onChangeHandler}
        />
        <input
          name="password"
          type="password"
          placeholder="Password..."
          value={password}
          autoComplete="off"
          onChange={e => {
            e.preventDefault();
            setPassword(e.target.value);
          }}
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
};
