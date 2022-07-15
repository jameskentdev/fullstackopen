const _ = require('lodash');

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favouriteBlog = (blogs) => {
  return blogs.length === 0
    ? null
    : blogs.reduce((max, blog) => (max.likes > blog.likes ? max : blog));
};

const mostBlogs = (blogs) => {
  return blogs.length === 0
    ? null
    : _(blogs)
        .groupBy('author')
        .map((objs, key) => ({
          author: key,
          blogs: objs.length,
        }))
        .reduce((most, elem) => (most.blogs > elem.blogs ? most : elem));
};

const mostLikes = (blogs) => {
  return blogs.length === 0
    ? null
    : _(blogs)
        .groupBy('author')
        .map((objs, key) => ({
          author: key,
          likes: _.sumBy(objs, 'likes'),
        }))
        .reduce((most, elem) => (most.likes > elem.likes ? most : elem));
};

module.exports = {
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
};

// .map((elem) => ({
//           author: elem.author,
//           blogs: elem,
//         }))
//         .reduce((most, elem) => {
//           return most[1].length > elem[1].length ? most : elem;
//         });.map((elem) => ({
//           author: elem.author,
//           blogs: elem,
//         }))
//         .reduce((most, elem) => {
//           return most[1].length > elem[1].length ? most : elem;
//         });
