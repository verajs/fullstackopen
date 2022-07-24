const totalLikes = require('../utils/list_helper').totalLikes

describe('total likes', () => {

    test('of empty list is zero', () => {
        blogs = []
        expect(totalLikes(blogs)).toBe(0)
    })

    test('when list has only one blog equals the likes of that', () => {
        blogs = [
            {
                title: "Scriabinite",
                author: "Sebas Vera",
                url: "https://www.scriabinite.com",
                likes: 12,
            }
        ]
        expect(totalLikes(blogs)).toBe(12)
    })

    test('of a bigger list is calculated right', () => {
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
        expect(totalLikes(blogs)).toBe(36)
    })

})
