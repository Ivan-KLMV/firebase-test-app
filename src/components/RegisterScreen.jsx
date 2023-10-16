import { auth } from '../firebaseUtils/config';
import { registerDB, updateUserProfile } from '../firebaseUtils/authUtils';
import { useState } from 'react';

export const RegisterScreen = () => {
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [file, setFile] = useState(undefined);

  const onChangeHandler = e => {
    e.preventDefault();
    const inputName = e.target.name;

    switch (inputName) {
      case 'login':
        setLogin(e.target.value);
        break;
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

    const newUser = await registerDB({ email, password });
    if (!newUser) {
      return;
    }
    if (newUser === 'auth/email-already-in-use') {
      console.log('takoi adres usge est');
    }
    await updateUserProfile({
      displayName: login,
      // photoURL:
    });

    const updatedUser = await auth.currentUser;
    console.log(updatedUser);
  };

  return (
    <>
      <form onSubmit={onSubmitHandler}>
        <input type="file" value={file} />
        <input
          name="login"
          type="text"
          placeholder="Login..."
          value={login}
          autoComplete="off"
          onChange={onChangeHandler}
        />
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
        <button type="submit">Registration</button>
      </form>
    </>
  );
};
