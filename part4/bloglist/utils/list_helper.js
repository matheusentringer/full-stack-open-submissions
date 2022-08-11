const _ = require('lodash');

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => { return sum + blog.likes }, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  array_of_likes = blogs.map(blog => blog.likes)
  max = Math.max(...array_of_likes)
  return blogs[array_of_likes.indexOf(max)]
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  authorsGrouped = Object.values(Array.from(_(blogs)
    .groupBy('author')))
    .map(x => {
      return {
        author: x[0].author,
        blogs: _.sumBy(x, () => 1)
      }
    }
    )

  array_of_blogs = authorsGrouped.map(author => author.blogs)
  max = Math.max(...array_of_blogs)
  return authorsGrouped[array_of_blogs.indexOf(max)]
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  authorsGrouped = Object.values(Array.from(_(blogs)
    .groupBy('author')))
    .map(x => {
      return {
        author: x[0].author,
        likes: _.sumBy(x, x => x.likes)
      }
    }
    )

  array_of_likes = authorsGrouped.map(author => author.likes)
  max = Math.max(...array_of_likes)
  return authorsGrouped[array_of_likes.indexOf(max)]
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}