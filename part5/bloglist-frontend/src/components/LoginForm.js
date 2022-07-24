import PropTypes from "prop-types";

const LoginForm = ({
  handleLogin,
  handleRegister,
  setUsername,
  setPassword,
  username,
  password,
}) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
        <h2>username</h2>
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <h2>password</h2>
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">login</button>
      <button onClick={handleRegister}>register</button>
    </form>
  );
};

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};
export default LoginForm;
