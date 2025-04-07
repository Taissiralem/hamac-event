import "./Login.css";
import { FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import logo from "../../../assets/logo/logo1.png";
import { useState } from "react";
import { useDispatch } from "react-redux"; // Import useDispatch
import { login } from "../../../redux/slices/authSlice"; // Import the login action
import { SignInUser } from "../../../services/AuthServices";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch(); // Initialize the dispatch hook

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    setError("");
    setLoading(true);
    setEmail("");
    setPassword("");

    try {
      const response = await SignInUser({ email, password });

      // Store the token in localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      dispatch(
        login({
          user: response.data.user,
          token: response.data.token,
        })
      );

      navigate("/admin/home");
    } catch (err) {
      console.error("Error logging in:", err.response?.data || err.message);
      setError(err.response?.data?.message || "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <img
        src={logo}
        alt="Hamac events logo"
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      />
      <div className="login-card">
        <h1>Bienvenue</h1>
        <p>Connectez-vous à Hamac Events</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <div className="input-wrapper">
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <FaEnvelope className="input-icon" />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="password">Mot de passe</label>
            <div className="input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {showPassword ? (
                <FaEye
                  className="input-icon"
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <FaEyeSlash
                  className="input-icon"
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </div>
          </div>

          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Chargement..." : "Continuer"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
