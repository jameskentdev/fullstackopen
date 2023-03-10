import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setUser(user);
    }
  }, []);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      const user = await loginService.login({ username, password });

      setUser(user);
      window.localStorage.setItem('loggedInUser', JSON.stringify(user));
    } catch (error) {
      setErrorMessage('Wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogoutClick = () => {
    setUser(null);
    window.localStorage.setItem('loggedInUser', null);
  };

  const loginForm = () => {
    return (
      <div>
        <h1>log in to application</h1>
        <h2 style={{ color: 'red' }}>{errorMessage}</h2>
        <form onSubmit={handleLoginSubmit}>
          <div>
            <label>Username</label>
            <input type="text" id="username" name="username" />
          </div>
          <div>
            <label>Password</label>
            <input type="password" id="password" name="password" />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  };

  return (
    <div>
      {!user ? (
        loginForm()
      ) : (
        <>
          <h2>blogs</h2>
          {user.name} logged in
          <button onClick={handleLogoutClick}>log out</button>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
