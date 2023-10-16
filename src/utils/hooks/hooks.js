import { getDataFromFirestore } from '../../firebaseUtils/authUtils';
import { useEffect, useState } from 'react';

export const useFireStoreCloction = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = getDataFromFirestore(setPosts);

    return () => unsubscribe();
  }, []);

  return posts;
};
