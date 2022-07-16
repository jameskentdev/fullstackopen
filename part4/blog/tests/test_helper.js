const Blog = require('../models/blog');

const initialBlogs = [
  {
    title: 'An interesting blog',
    author: 'Teddy',
    url: 'http://example.com',
    like: 100,
  },
  {
    title: 'An new blog',
    author: 'Mishka',
    url: 'http://example.com',
    like: 100,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb,
};
