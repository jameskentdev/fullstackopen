import { useState } from 'react';
import PropTypes from 'prop-types';
import blogService from '../services/blogs';

const Blog = ({ likeHandler, user, blog }) => {
  const [visible, setVisible] = useState(false);

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

  const removeOnClick = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.remove(blog.id);
    }
  };

  return (
    <div style={blogStyle}>
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
            <button onClick={likeHandler}>like</button>
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

Blog.propTypes = {
  user: PropTypes.object.isRequired,
  blog: PropTypes.object.isRequired,
};

export default Blog;
