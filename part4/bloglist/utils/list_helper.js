const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => { return sum + blog.likes }, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0){
    return null
  }
  array_of_likes = blogs.map(blog => blog.likes)
  console.log(array_of_likes)
  max = Math.max(...array_of_likes)
  console.log(max)
  return blogs[array_of_likes.indexOf(max)]
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}