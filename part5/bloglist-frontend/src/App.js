import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import registerService from "./services/register";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [url, setBlogUrl] = useState("");
  const [title, setBlogName] = useState("");
  const [author, setBlogAuthor] = useState("");
  const [user, setUser] = useState(null);
  const [newNotif, setNewNotif] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setNewNotif(`Welcome back, ${username}.`);
      setTimeout(() => {
        setNewNotif(null);
      }, 4000);
      setUsername("");
      setPassword("");
      window.location.reload();
    } catch (exception) {
      setNewNotif(`Wrong username or password.`);
      setTimeout(() => {
        setNewNotif(null);
      }, 4000);
    }
  };
  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    window.location.reload(false);
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    try {
      const user = await registerService.register({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setNewNotif(`Welcome to the bloglist, ${username}.`);
      setTimeout(() => {
        setNewNotif(null);
      }, 4000);
      setUsername("");
      setPassword("");
      window.location.reload();
    } catch (exception) {
      setNewNotif(`Username already exists.`);
      setTimeout(() => {
        setNewNotif(null);
      }, 4000);
    }
  };

  const addBlog = async (event) => {
    event.preventDefault();
    try {
      const blog = await blogService.postBlog({
        title,
        author,
        url,
      });
      setNewNotif(`"${title}" has been successfully added.`);
      setTimeout(() => {
        setNewNotif(null);
      }, 4000);
      setBlogs(blogs.concat(blog));
      setBlogName("");
      setBlogAuthor("");
      setBlogUrl("");
    } catch (exception) {
      setNewNotif(`Formatting error.`);
      setTimeout(() => {
        setNewNotif(null);
      }, 4000);
    }
  };

  return (
    <div>
      <Notification message={newNotif} />
      <h2>blogs</h2>
      {user === null ? (
        <LoginForm
          handleLogin={handleLogin}
          handleRegister={handleRegister}
          setUsername={setUsername}
          setPassword={setPassword}
          username={username}
          password={password}
        />
      ) : (
        <div>
          <div>
            {user.username} logged-in
            <button onClick={handleLogout}>logout</button>
          </div>
          <Togglable buttonLabel="new blog">
            <BlogForm
              addBlog={addBlog}
              title={title}
              setBlogName={setBlogName}
              author={author}
              setBlogAuthor={setBlogAuthor}
              url={url}
              setBlogUrl={setBlogUrl}
            />
          </Togglable>
        </div>
      )}

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
