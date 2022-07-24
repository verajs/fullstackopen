const mostLikes = require("../utils/list_helper").mostLikes;

describe("most likes", () => {
  blogs = [
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
    likes: 12
  }


  test('blog with most likes shows', () => {
    expect(mostLikes(blogs)).toEqual(author)
  })
});
