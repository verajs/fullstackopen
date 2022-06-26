const mostBlogs = require("../utils/list_helper").mostBlogs;

describe("most blogs", () => {
  blogs = [
    {
      title: "Scriabinite",
      author: "Sebas Vera",
      url: "https://www.scriabinite.com",
      likes: 12,
    },
    {
      title: "Lisztinite",
      author: "Sebas Vera",
      url: "https://www.lisztinite.com",
      likes: 12,
    },
    {
      title: "Gizmodo",
      author: "Multiple",
      url: "https://www.gizmodo.com",
      likes: 8,
    },
    {
      title: "React Patterns",
      author: "Michael Chan",
      url: "https://www.reactpatterns.com/",
      likes: 10,
    },
    {
      title: "Beatles blog",
      author: "Paul McCharmley",
      url: "https://www.paulmccharmleyringo.com",
      likes: 6,
    },
  ];

  const author =
  {
    author: "Sebas Vera",
    blogs: 2
  }



  test("blog with most likes shows", () => {
    expect(mostBlogs(blogs)).toEqual(author);
  });
});
