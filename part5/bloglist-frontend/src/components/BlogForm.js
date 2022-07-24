const BlogForm = ({
  addBlog,
  title,
  setBlogName,
  author,
  setBlogAuthor,
  url,
  setBlogUrl,
}) => {
  return (
    <form onSubmit={addBlog}>
      <h2>blog name</h2>
      <input
       id="title"
        type="text"
        value={title}
        onChange={({ target }) => setBlogName(target.value)}
      />
      <h2>blog author</h2>
      <input
      id="author"
        type="text"
        value={author}
        onChange={({ target }) => setBlogAuthor(target.value)}
      />
      <h2>blog url</h2>
      <input
      id="url"
        type="text"
        value={url}
        onChange={({ target }) => setBlogUrl(target.value)}
      />
      <button type="submit">submit</button>
    </form>
  );
};

export default BlogForm;
