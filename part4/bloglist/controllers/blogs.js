const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user")
const jwt = require('jsonwebtoken');
const { tokenExtractor } = require("../utils/middleware");
blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
  const body = request.body;
   

  if (!body.title || !body.url) {
    return response.status(400).json({
      error: "Name or content missing",
    });
  }
  const token = tokenExtractor(request)
  console.log(token)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if(!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  const blogobject = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 1,
    user: user._id
  };

  const blog = new Blog(blogobject);

  user.blogs = user.blogs.concat(blog._id)
  await user.save()
  result = await blog.save();
  response.status(201).json(result);
});

blogRouter.delete("/:id", async (request, response) => {
  const token = tokenExtractor(request)
  console.log(token)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  const user = await User.findById(decodedToken.id)

  const { id } = request.params;
  const blog = await Blog.findById(id);

  if (blog.user._id.toString() === user._id.toString() ) {
    try {
      await blog.delete(blog)
      response.status(204).end()
    } catch (exception) {
      console.log('error idk i guess')
    }
  } else {
    return response.status(401).json({ error: `Unauthorized` })
  }
});

blogRouter.put("/:id", async (request, response) => {
  const { id } = request.params;
  const body = request.body;
  const newblog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };
  const currentblog = await Blog.findByIdAndUpdate(id, newblog)
  response.json(currentblog)
});
module.exports = blogRouter;
