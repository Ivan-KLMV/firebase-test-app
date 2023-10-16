// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from 'firebase/app';
// Функція для підключення авторизації в проект
import { getAuth, onAuthStateChanged } from 'firebase/auth';
// Функція для підключення бази даних у проект
import { getFirestore } from 'firebase/firestore';
// Функція для підключення сховища файлів в проект
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';

// import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
// import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCQFdnibRCPcBR8NFLGYgpELQvbgHNeJcs',
  authDomain: 'react-native-goit-396807.firebaseapp.com',
  databaseURL:
    'https://react-native-goit-396807-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'react-native-goit-396807',
  storageBucket: 'react-native-goit-396807.appspot.com',
  messagingSenderId: '584180228988',
  appId: '1:584180228988:web:da609310f5d641722f3af9',
  measurementId: 'G-5ME96QR0Z8',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const database = getDatabase(app);

export const monitorAuthState = async () => {
  onAuthStateChanged(auth, user => {
    if (user !== null) {
      console.log('logged in', user);
    } else {
      console.log('no user', Boolean(user));
    }
  });
};

// monitorAuthState();
