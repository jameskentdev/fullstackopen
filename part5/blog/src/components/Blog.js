import { useState } from 'react';
import _ from 'lodash';
import blogService from '../services/blogs';

const Blog = ({ user, blog }) => {
  const [visible, setVisible] = useState(false);
  const [toggle, setToggle] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const visibleOnClick = () => {
    setVisible(!visible);
  };

  const likeOnClick = async () => {
    // Increment the likes, strip the populated user and remove blog id
    const updatedBlog = _.omit(
      { ...blog, likes: blog.likes + 1, user: blog.user.id },
      'id'
    );
    await blogService.update(blog.id, updatedBlog);

    // Need to do this to force re-render
    setToggle(!toggle);
  };

  const removeOnClick = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.remove(blog.id);
    }
  };

  return (
    <div style={blogStyle}>
      <div>{blog.id}</div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div>
          {blog.title} {blog.author}
        </div>
        {visible === true ? (
          <>
            <button onClick={visibleOnClick}>hide</button>
          </>
        ) : (
          <button onClick={visibleOnClick}>view</button>
        )}
      </div>
      {visible && (
        <>
          <div>{blog.url}</div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div>{blog.likes} likes</div>
            <button onClick={likeOnClick}>like</button>
          </div>
          <div>{blog.user.name}</div>
          {user.username === blog.user.username && (
            <button onClick={removeOnClick}>remove</button>
          )}
        </>
      )}
    </div>
  );
};

export default Blog;
