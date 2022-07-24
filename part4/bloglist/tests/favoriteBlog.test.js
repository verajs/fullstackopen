const favoriteBlog = require('../utils/list_helper').favoriteBlog

describe('favorite blog', () => {
test('correct blog with most likes', () => {
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
    ]

    expect(favoriteBlog(blogs)).toEqual(blogs[0])      
})
})