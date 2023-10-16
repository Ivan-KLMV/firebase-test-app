import { Link, Route, Routes } from 'react-router-dom';
import { RegisterScreen } from './RegisterScreen';
import { logoutDB } from '../firebaseUtils/authUtils';
import { LoginScreen } from './LoginScreen';
import { useDispatch, useSelector } from 'react-redux';
import { isLoggedIn, logOutAction } from 'redux/userSlice';
import { PostsScreen } from './PostsScreen';

export const App = () => {
  const isUserLoggedIn = useSelector(isLoggedIn);
  const dispatch = useDispatch();

  return (
    <div>
      React homework template
      {isUserLoggedIn && (
        <button
          type="button"
          onClick={() => {
            dispatch(logOutAction());
            logoutDB();
          }}
        >
          Log Out
        </button>
      )}
      <nav>
        <Link to="/">Home</Link>
        <Link to="/register">Registration Page</Link>
        <Link to="/login">Login Page</Link>
        <Link to="/postscreen">Post Screen</Link>
      </nav>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/postscreen" element={<PostsScreen />} />
      </Routes>
    </div>
  );
};
