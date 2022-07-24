const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)

initialBlogs = [
    {
      title: "Scriabinite",
      author: "Sebas Vera",
      url: "https://www.scriabinite.com",
      likes: 12,
    },
    {
      title: "Gizmodo",
      author: "Multiple",
      url: "https://www.gizmodo.com",
      likes: 8,
    }
  ];

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})


test('a valid blog can be added', async () => {
  const newBlog = {
    "title": "Advanced Neuroscience",
    "author": "Reito McPufi",
    "url": "https://reito.com/",
    "likes": 99
}

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const author = response.body.map(r => r.author)

  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(author).toContain(
    'Reito McPufi'
  )
})

test('there are more than two blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(2)
})

test('the first blog is sebasblog', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].author).toBe('Sebas Vera')
})


test('blogs are returned as json', async () => {
    await api 
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(2)
})




afterAll(() => {
    mongoose.connection.close()
}, 100000)