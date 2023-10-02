import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth, database, db } from './config';
import { collection, getDocs } from 'firebase/firestore';
import { onValue, ref } from 'firebase/database';

export const registerDB = async ({ email, password }) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // console.log('userCredential', userCredential.user);
    return userCredential.user;
  } catch (error) {
    // console.dir(error.code);
    return error.code;
  }
};

export const loginDB = async ({ email, password }) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    // console.log('userCredential', userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const user = await auth.currentUser;
    console.log('getCurrentUser', user);
  } catch (error) {
    console.error(error);
  }
};

export const logoutDB = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error(error);
  }
};

export const updateUserProfile = async update => {
  const user = auth.currentUser;

  if (user) {
    try {
      await updateProfile(user, update);
    } catch (error) {
      throw error;
    }
  }
};

export const getDataFromFirestore = async setFn => {
  try {
    const postsRef = ref(database, 'posts/');

    onValue(postsRef, snapshot => {
      const data = snapshot.val();
      setFn(data);
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
