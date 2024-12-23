import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminCheck = () => {
  const userRole = useSelector((state) => state.auth?.user?.role);
  console.log(useSelector((state) => state.auth?.user));
  const navigate = useNavigate();
  useEffect(() => {
    if (!userRole || userRole !== "admin") {
      navigate("/notfound");
    }
  }, []);
  return <></>;
};

export default AdminCheck;
