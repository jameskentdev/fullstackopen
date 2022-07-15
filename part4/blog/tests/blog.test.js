const {
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
} = require('../utils/list_helper');
const Blog = require('../models/blog');

describe('total likes', () => {
  test('of empty list is zero', () => {
    const blogs = [];

    expect(totalLikes(blogs)).toEqual(0);
  });

  test('when list only has one blog', () => {
    const blogs = [
      new Blog({
        title: 'Blog 1',
        author: 'John',
        url: 'http://example.com',
        likes: 10,
      }),
    ];

    expect(totalLikes(blogs)).toEqual(10);
  });

  test('when list has multiple blogs', () => {
    const blogs = [
      new Blog({
        title: 'Blog 1',
        author: 'John',
        url: 'http://example.com',
        likes: 10,
      }),
      new Blog({
        title: 'Blog 2',
        author: 'John',
        url: 'http://example.com',
        likes: 20,
      }),
      new Blog({
        title: 'Blog 3',
        author: 'John',
        url: 'http://example.com',
        likes: 15,
      }),
    ];

    expect(totalLikes(blogs)).toEqual(45);
  });
});

describe('favourite blog', () => {
  test('none when there is no blog', () => {
    const blogs = [];

    expect(favouriteBlog(blogs)).toEqual(null);
  });

  test('the one when there is only one', () => {
    const blogs = [
      new Blog({
        title: 'Blog 1',
        author: 'John',
        url: 'http://example.com',
        likes: 10,
      }),
    ];

    expect(favouriteBlog(blogs)).toEqual(blogs[0]);
  });

  test('the most liked one out of a list', () => {
    const blogs = [
      new Blog({
        title: 'Blog 1',
        author: 'John',
        url: 'http://example.com',
        likes: 10,
      }),
      new Blog({
        title: 'Blog 2',
        author: 'John',
        url: 'http://example.com',
        likes: 20,
      }),
      new Blog({
        title: 'Blog 3',
        author: 'John',
        url: 'http://example.com',
        likes: 15,
      }),
    ];

    expect(favouriteBlog(blogs)).toEqual(blogs[1]);
  });
});

describe('author with most blogs', () => {
  test('with an empty list', () => {
    const blogs = [];
    expect(mostBlogs(blogs)).toEqual(null);
  });

  test('the one when there is only one', () => {
    const blogs = [
      new Blog({
        title: 'Blog 1',
        author: 'John',
        url: 'http://example.com',
        likes: 10,
      }),
    ];

    const equals = {
      author: 'John',
      blogs: 1,
    };

    expect(mostBlogs(blogs)).toEqual(equals);
  });

  test('the one where its all the same author', () => {
    const blogs = [
      new Blog({
        title: 'Blog 1',
        author: 'John',
        url: 'http://example.com',
        likes: 10,
      }),
      new Blog({
        title: 'Blog 2',
        author: 'John',
        url: 'http://example.com',
        likes: 20,
      }),
      new Blog({
        title: 'Blog 3',
        author: 'John',
        url: 'http://example.com',
        likes: 15,
      }),
    ];

    const equals = {
      author: 'John',
      blogs: blogs.length,
    };

    expect(mostBlogs(blogs)).toEqual(equals);
  });

  test('the one with multiple authors', () => {
    const blogs = [
      new Blog({
        title: 'Blog 1',
        author: 'John',
        url: 'http://example.com',
        likes: 10,
      }),
      new Blog({
        title: 'Blog 2',
        author: 'John',
        url: 'http://example.com',
        likes: 20,
      }),
      new Blog({
        title: 'Blog 1',
        author: 'Jack',
        url: 'http://example.com',
        likes: 15,
      }),
      new Blog({
        title: 'Blog 2',
        author: 'Jack',
        url: 'http://example.com',
        likes: 15,
      }),
      new Blog({
        title: 'Blog 3',
        author: 'Jack',
        url: 'http://example.com',
        likes: 15,
      }),
    ];

    const equals = {
      author: 'Jack',
      blogs: 3,
    };

    expect(mostBlogs(blogs)).toEqual(equals);
  });
});

describe('author with most likes', () => {
  test('with an empty list', () => {
    const blogs = [];
    expect(mostLikes(blogs)).toEqual(null);
  });

  test('the one when there is only one', () => {
    const blogs = [
      new Blog({
        title: 'Blog 1',
        author: 'John',
        url: 'http://example.com',
        likes: 10,
      }),
    ];

    const equals = {
      author: 'John',
      likes: 10,
    };

    expect(mostLikes(blogs)).toEqual(equals);
  });

  test('the one where its all the same author', () => {
    const blogs = [
      new Blog({
        title: 'Blog 1',
        author: 'John',
        url: 'http://example.com',
        likes: 10,
      }),
      new Blog({
        title: 'Blog 2',
        author: 'John',
        url: 'http://example.com',
        likes: 20,
      }),
    ];

    const equals = {
      author: 'John',
      likes: 30,
    };

    expect(mostLikes(blogs)).toEqual(equals);
  });

  test('the one with multiple authors', () => {
    const blogs = [
      new Blog({
        title: 'Blog 1',
        author: 'John',
        url: 'http://example.com',
        likes: 10,
      }),
      new Blog({
        title: 'Blog 2',
        author: 'John',
        url: 'http://example.com',
        likes: 20,
      }),
      new Blog({
        title: 'Blog 1',
        author: 'Jack',
        url: 'http://example.com',
        likes: 15,
      }),
      new Blog({
        title: 'Blog 2',
        author: 'Jack',
        url: 'http://example.com',
        likes: 15,
      }),
      new Blog({
        title: 'Blog 3',
        author: 'Jack',
        url: 'http://example.com',
        likes: 15,
      }),
    ];

    const equals = {
      author: 'Jack',
      likes: 45,
    };

    expect(mostLikes(blogs)).toEqual(equals);
  });
});
