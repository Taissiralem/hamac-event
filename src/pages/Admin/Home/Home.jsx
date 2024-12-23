import { useNavigate } from "react-router-dom";
import "./Home.css";
const Admin = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="admin-home">
        <div className="highadmin">
          <h1>welcome to your admin panel</h1>
          <p>here you can manage your stats , users,products, categories</p>
        </div>
        <button onClick={() => navigate("/")}>Go back home</button>
      </div>
    </>
  );
};

export default Admin;
