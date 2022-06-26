const User = require('../models/user')
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  let totalAmount = 0;
  for (let i = 0; i < blogs.length; i++) {
      totalAmount += blogs[i].likes;
  }
  return totalAmount;
};

const favoriteBlog = (blogs) => {
  let ans = Math.max.apply(
    Math,
    blogs.map((blog) => {
      return blog.likes;
    })
  );

  let obj = blogs.find((blog) => {
    return blog.likes == ans;
  });
  return obj;
};

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return {};
    }
    else {
        let authorBlogs = {}
        blogs.forEach(blog => {authorBlogs[blog.author] = (authorBlogs[blog.author] || 0) + 1})
        
        let maxAmount = Math.max(...Object.values(authorBlogs))
        let mostBlogs = Object.keys(authorBlogs).filter(author => authorBlogs[author] === maxAmount)
        return {
            author: mostBlogs[0],
            blogs: maxAmount
        }
    }
} 


const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {};
  } else {
  let authorLikes = {}
  blogs.forEach(blog => {authorLikes[blog.author] = (authorLikes[blog.author] || 0) + blog.likes})

  let maxAmount = Math.max(...Object.values(authorLikes))
  let mostLiked = Object.keys(authorLikes).filter(author => authorLikes[author] === maxAmount)
  return {
      author: mostLiked[0],
      likes: maxAmount
  }
};
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}



module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  usersInDb,
};
