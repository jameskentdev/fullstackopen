const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const { userExtractor } = require('../utils/middleware');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: true,
    name: true,
  });
  response.json(blogs);
});

blogsRouter.post('/', userExtractor, async (request, response, _next) => {
  const { body } = request;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: request.user._id,
  });

  let savedBlog = await blog.save();
  savedBlog = await savedBlog.populate('user', {
    username: true,
    name: true,
  });
  request.user.blogs = request.user.blogs.concat(savedBlog._id);
  await request.user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', userExtractor, async (request, response, _next) => {
  const blog = await Blog.findById(request.params.id);

  if (request.user.id.toString() === blog.user.toString()) {
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } else {
    return response
      .status(401)
      .json({ error: 'Unable to delete blog, incorrect user.' });
  }
});

blogsRouter.put('/:id', userExtractor, async (request, response, _next) => {
  const blog = await Blog.findById(request.params.id);

  if (request.user.id.toString() === blog.user.toString()) {
    const { body } = request;

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, body, {
      new: true,
      runValidators: true,
      context: 'query',
    });

    response.status(201).json(updatedBlog);
  } else {
    return response
      .status(401)
      .json({ error: 'Unable to edit blog, incorrect user.' });
  }
});

module.exports = blogsRouter;
