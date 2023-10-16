import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import {
  collection,
  getDocs,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { auth, database, db, storage } from './config';

export const registerDB = async ({ email, password }) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    return userCredential.user;
  } catch (error) {
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

export const getDataFromFirestore = setFn => {
  try {
    const collectionRef = collection(db, 'posts');

    const unsubscribe = onSnapshot(collectionRef, snapshot => {
      const postsCollection = snapshot.docs.map(post => ({
        ...post.data(),
        id: post.id,
      }));

      console.log(postsCollection);
      setFn(postsCollection);
    });

    return unsubscribe;
  } catch (error) {
    console.error('Error fetching data from Firestore:', error);
  }
};

export const writeDataToFirestore = async newData => {
  try {
    const docRef = await addDoc(collection(db, 'posts'), newData);
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
    throw e;
  }
};

export const deleteDataFromForestore = async id => {
  try {
    const post = doc(db, 'posts', id);
    await deleteDoc(post);
  } catch (error) {}
};

export const uploadFile = async (file, folder) => {
  const storageRef = ref(storage);
  const fileRef = ref(storageRef, file.name);
  const folderRef = ref(storageRef, `/${folder}/${fileRef._location.path_}`);
  await uploadBytes(folderRef, file);
  return folderRef.fullPath;
};

export const getFileDownloadURL = async filePath => {
  const fileRef = ref(storage, filePath);

  try {
    const downloadURL = await getDownloadURL(fileRef);
    // console.log('File download URL:', downloadURL);
    return downloadURL;
  } catch (error) {
    console.error('Error getting download URL:', error);
    return null;
  }
};
