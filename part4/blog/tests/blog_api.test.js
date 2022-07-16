const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('correct blog posts are returned', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test('blogs contain id property', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body[0].id).toBeDefined();
});

test('correct blog is created', async () => {
  const blog = {
    title: 'A new blog!',
    author: 'Teddy',
    url: 'http://example.com',
    likes: 1,
  };

  await api
    .post('/api/blogs')
    .send(blog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  const contents = blogsAtEnd.map((n) => n.title);
  expect(contents).toContain('A new blog!');
});

test('missing likes property defaults to 0', async () => {
  const blog = {
    title: 'A new blog!',
    author: 'Teddy',
    url: 'http://example.com',
  };

  await api
    .post('/api/blogs')
    .send(blog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  const createdBlog = blogsAtEnd[blogsAtEnd.length - 1];

  expect(createdBlog.likes).toEqual(0);
});

test('missing title or url results in bad request', async () => {
  const blog = {
    author: 'Teddy',
    likes: 100,
  };

  await api.post('/api/blogs').send(blog).expect(400);
});

test('succesfully delete a blog post', async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToDelete = blogsAtStart[0];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);

  const titles = blogsAtEnd.map((r) => r.author);

  expect(titles).not.toContain(blogToDelete.title);
});

test('edit a blog post', async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToEdit = blogsAtStart[0];

  const newTitle = 'An edited title!';
  blogToEdit.title = newTitle;

  const response = await api
    .put(`/api/blogs/${blogToEdit.id}`)
    .send(blogToEdit)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  expect(response.body.title).toEqual(newTitle);
});
