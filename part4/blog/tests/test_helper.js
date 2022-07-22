const Blog = require('../models/blog');
const User = require('../models/user');

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

const initialUsers = [
  {
    username: 'james',
    name: 'James',
    password: 'password',
  },
  {
    username: 'teddy',
    name: 'Teddy',
    password: 'password',
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

const loginUser = async (api) => {
  const response = await api.post('/api/login').send({
    username: initialUsers[0].username,
    password: initialUsers[0].password,
  });

  return response.body;
};

module.exports = {
  initialBlogs,
  initialUsers,
  blogsInDb,
  usersInDb,
  loginUser,
};
