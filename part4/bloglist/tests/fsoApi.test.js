const mongoose = require("mongoose");
const app = require("../app");
const Blog = require("../models/blog");
const supertest = require("supertest");
const api = supertest(app);

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
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
});

describe("GET requests", () => {
  test("API returns correct amount of blog posts in JSON format", async () => {
    const response = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(response.body).toHaveLength(2);
  });

  test("Identifier property of blog posts is named id", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body[0].id).toBeDefined();
  });
});

describe("POST requests", () => {
  test("a valid blog can be added", async () => {
    const newBlog = {
      title: "Advanced Neuroscience",
      author: "Reito McPufi",
      url: "https://reito.com/",
      likes: 99,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");

    const author = response.body.map((r) => r.author);

    expect(response.body).toHaveLength(initialBlogs.length + 1);
    expect(author).toContain("Reito McPufi");
  });

  test("likes has default value", async () => {
    const newBlog = {
      title: "Advanced Neuroscience",
      author: "Reito McPufi",
      url: "https://reito.com/",
    };

    await api.post("/api/blogs").send(newBlog);

    const response = await api.get("/api/blogs");
    expect(response.body[2].likes).toBe(1);
  });

  test("title and url properties 400 error", async () => {
    const newBlog = {
      author: "Reito McPufi",
      likes: 99,
    };

    await api.post("/api/blogs").send(newBlog).expect(400);
  });

  test("successful deletion of blog by id", async () => {
    const blogsAtStart = await Blog.find({});

    const blogToDelete = blogsAtStart[0];
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);
  });

  test('HTTP PUT blog likes', async () => {
    const response = await api.get('/api/blogs')
    const blogsAtStart = await Blog.find({});
    const blogToChange = blogsAtStart[0];

    await api.put(`/api/blogs/${blogToChange.id}`).expect(200)
  })

});


afterAll(() => {
  mongoose.connection.close();
}, 100000);
