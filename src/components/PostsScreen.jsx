import { isLoggedIn } from 'redux/userSlice';
import {
  deleteDataFromForestore,
  getFileDownloadURL,
  uploadFile,
  writeDataToFirestore,
} from '../firebaseUtils/authUtils';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useFireStoreCloction } from 'utils/hooks/hooks';

export const PostsScreen = () => {
  const isUserLoggedIn = useSelector(isLoggedIn);
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [file, setFile] = useState('');
  const posts = useFireStoreCloction();

  const addPosts = async e => {
    e.preventDefault();

    const filePath = await uploadFile(file, 'folder');
    const imagePostUrl = await getFileDownloadURL(filePath);
    writeDataToFirestore({ title, location, likes: 0, imagePostUrl });

    e.target[0].value = '';
    setLocation('');
    setTitle('');
    setFile('');
  };

  return (
    <>
      <p>Posts</p>

      {isUserLoggedIn ? (
        <div>
          <form onSubmit={addPosts} style={{ marginBottom: 10 }}>
            <label>
              <input
                type="file"
                onChange={e => {
                  e.preventDefault();
                  setFile(e.target.files[0]);
                }}
              />
            </label>
            <label>
              Title
              <input
                type="text"
                value={title}
                onChange={e => {
                  e.preventDefault();
                  setTitle(e.target.value);
                }}
              />
            </label>
            <label>
              Location
              <input
                type="text"
                value={location}
                onChange={e => {
                  e.preventDefault();
                  setLocation(e.target.value);
                }}
              />
            </label>
            <button type="submit">Add Post</button>
          </form>
          <ul
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 8,
              listStyle: 'none',
              margin: 0,
              padding: 0,
            }}
          >
            {posts.map(post => (
              <li
                key={post.id}
                style={{ flexBasis: '250px', flexShrink: 0, flexGrow: 0 }}
              >
                <div style={{ width: 250, height: 250 }}>
                  <img
                    src={post.imagePostUrl}
                    alt={post.title}
                    style={{
                      display: 'block',
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </div>
                <b>{post.title}</b>
                <p>Location: {post.location}</p>
                <p>likes: {post.likes}</p>
                <button
                  type="button"
                  onClick={() => {
                    deleteDataFromForestore(post.id);
                  }}
                >
                  delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>You are not LoggedIn</p>
      )}
    </>
  );
};
