import TogglableInfo from "./TogglableInfo";
import blogService from "../services/blogs";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

const Blog = ({ blog, setLikespi }) => {
  const [token, setToken] = useState(null);
  const addLike = async (event) => {
    event.preventDefault();
    const title = blog.title;
    const author = blog.author;
    const url = blog.url;
    const likes = blog.likes + 1;
    try {
      const plog = await blogService.putBlog({
        ...blog,
        likes: blog.likes + 1,
      });
      console.log("idk???");
    } catch (exception) {
      console.log("buenopi");
    }
  };

  const onDelete = async (event) => {
    event.preventDefault();
    try {
      await blogService.deleteBlog({ ...blog });
    } catch (exception) {
      console.log("error");
    }
  };
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      var decoded = jwt_decode(user.token);
      setToken(decoded.id);
      if (token === blog.user) {
        console.log("sí son");
      } else {
        console.log("noson");
      }
    }
  }, []);

  if (token === blog.user) {
    return (
      <div className="blog">
        <h3>{blog.title}</h3>
        <TogglableInfo buttonLabel="view">
          <p>{blog.author}</p>
          <p>{blog.url}</p>
          <div>
            {blog.likes}
            <button onClick={addLike}>like</button>
            <button onClick={onDelete}>delete</button>
          </div>
        </TogglableInfo>
      </div>
    );
  } else {
    return (
      <div className="blog">
        <h3>{blog.title}</h3>
        <TogglableInfo buttonLabel="view">
          <p>{blog.author}</p>
          <p>{blog.url}</p>
          <div>
            {blog.likes}
            <button onClick={addLike}>like</button>
          </div>
        </TogglableInfo>
      </div>
    );
  }
};

export default Blog;
