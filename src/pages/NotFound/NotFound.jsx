import { useNavigate } from "react-router-dom";
import "./NotFound.css";
// import image404 from "../../assets/svg/404.svg";
export default function NotFound() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <p className="not-found-message">
        Oops! The page you are looking for doesn’t exist.
      </p>
      <button className="not-found-button" onClick={handleGoHome}>
        Go Home
      </button>
    </div>
  );
}
