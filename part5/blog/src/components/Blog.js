import { useState } from 'react';

const Blog = ({ blog }) => {
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
  const likeOnClick = () => {};

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
            <button onClick={likeOnClick}>like</button>
          </div>
          <div>{blog.user.name}</div>
        </>
      )}
    </div>
  );
};

export default Blog;
