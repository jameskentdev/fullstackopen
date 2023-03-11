import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState({
    error: false,
    message: '',
  });
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
      setNotification({ error: true, message: 'Wrong credentials' });
      setTimeout(() => {
        setNotification({
          error: false,
          message: '',
        });
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
        <Notification {...notification} />
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

  const handleCreateBlogSubmit = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const author = e.target.author.value;
    const url = e.target.url.value;

    console.log(title, author, url);

    const blog = await blogService.create(user.token, {
      title,
      author,
      url,
    });

    setBlogs(blogs.concat(blog));
    setNotification({
      error: false,
      message: `a new blog ${title} by ${author} added`,
    });
    setTimeout(() => {
      setNotification({
        error: false,
        message: '',
      });
    }, 5000);
  };

  const createBlogForm = () => {
    return (
      <div>
        <h1>create new</h1>
        <form onSubmit={handleCreateBlogSubmit}>
          <div>
            <label>title</label>
            <input type="text" id="title" name="title" />
          </div>
          <div>
            <label>author</label>
            <input type="text" id="author" name="author" />
          </div>
          <div>
            <label>url</label>
            <input type="text" id="url" name="url" />
          </div>
          <button type="submit">create</button>
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
          <Notification {...notification} />
          {user.name} logged in
          <button onClick={handleLogoutClick}>log out</button>
          {createBlogForm()}
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
