import { getDataFromFirestore } from '../firebase/authUtils';
import { useEffect, useState } from 'react';

export const PostsScreen = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getDataFromFirestore(setPosts);
  }, []);
  return (
    <>
      <p>Posts</p>
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </>
  );
};
