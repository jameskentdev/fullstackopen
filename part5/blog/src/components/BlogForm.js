import React from 'react';

const BlogForm = ({ handleCreateBlogSubmit }) => {
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

export default BlogForm;
