import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import Blog from "./Blog";


describe('Blog component tests', () => {
    const blog = {
      title: "The Chai Chronicles",
      author: "Reito McPufi",
      url: "www.chaichronicles.com",
      likes: 3,
    };


    
test("renders title and author but not url or likes", () => {

  const component = render(<Blog blog={blog}/>)
  expect(component.container).toHaveTextContent(
    'The Chai Chronicles'
  )
});

test("clicking the view button displays the blog's url and its likes amount", async () => {
    const component = render(<Blog blog={blog}/>)
    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
        "www.chaichronicles.com"
    )
    expect(component.container).toHaveTextContent(
        '3'
    )
    
  });

  test('clicking the button calls event handler twice', async () => {
  
    const mockHandler = jest.fn()
  
    render(
      <Blog blog={blog} addLike={mockHandler} />
    )
  
    const user = userEvent.setup()
    const button = screen.getByText('like')
    await user.click(button)
    await user.click(button)
  
    expect(mockHandler.mock.calls).toHaveLength(2)
  })

})