import { useState } from 'react';

const BlogForm = ({ createBlog }) => {
  const [values, setValues] = useState({ title: '', author: '', url: '' });

  const handleChange = (event) => {
    const value = event.target.value;
    setValues({
      ...values,
      [event.target.name]: value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const blog = {
      title: values.title,
      author: values.author,
      url: values.url,
    };

    createBlog(blog);
    setValues({ title: '', author: '', url: '' });
  };

  return (
    <div>
      <h1>create new</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="title">title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={values.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="author">author</label>
          <input
            type="text"
            id="author"
            name="author"
            value={values.author}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="url">url</label>
          <input
            type="text"
            id="url"
            name="url"
            value={values.url}
            onChange={handleChange}
          />
        </div>
        <button id="submit-button" type="submit">
          create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
