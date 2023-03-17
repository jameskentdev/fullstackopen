import { useState, useEffect, useRef } from 'react';
import _ from 'lodash';
import Blog from './components/Blog';
import Notification from './components/Notification';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState({
    error: false,
    message: '',
  });
  const [user, setUser] = useState();
  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      const user = await loginService.login({ username, password });

      setUser(user);
      blogService.setToken(user.token);
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

  const addBlog = async (newBlogObject) => {
    const returnedBlog = await blogService.create(newBlogObject);
    setBlogs(blogs.concat(returnedBlog));

    blogFormRef.current.toggleVisibility();

    setNotification({
      error: false,
      message: `a new blog ${newBlogObject.title} by ${newBlogObject.author} added`,
    });

    setTimeout(() => {
      setNotification({
        error: false,
        message: '',
      });
    }, 5000);
  };

  const handleLike = async (index) => {
    const id = blogs[index].id;

    // Increment the likes, strip the populated user and remove blog id
    let updatedBlog = blogs[index];
    updatedBlog = _.omit(
      {
        ...updatedBlog,
        likes: updatedBlog.likes + 1,
        user: updatedBlog.user.id,
      },
      'id'
    );

    await blogService.update(id, updatedBlog);

    // Increment the blog locally to update state
    const newBlogs = blogs.map((blog) => {
      if (blog.id === id) {
        return {
          ...blog,
          likes: blog.likes + 1,
        };
      }
      return blog;
    });

    setBlogs(newBlogs);
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
          <Togglable buttonLabel="new note" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog, index) => (
              <Blog
                key={blog.id}
                likeHandler={() => handleLike(index)}
                user={user}
                blog={blog}
              />
            ))}
        </>
      )}
    </div>
  );
};

export default App;
