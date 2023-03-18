import { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ removeHandler, likeHandler, user, blog }) => {
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

  return (
    <div className="blog" style={blogStyle}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div data-testid="title-author">
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
        <div data-testid="view-enabled">
          <div>{blog.url}</div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div>{blog.likes} likes</div>
            <button onClick={likeHandler}>like</button>
          </div>
          <div>{blog.user.name}</div>
          {user.username === blog.user.username && (
            <button onClick={removeHandler}>remove</button>
          )}
        </div>
      )}
    </div>
  );
};

Blog.propTypes = {
  likeHandler: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  blog: PropTypes.object.isRequired,
};

export default Blog;
