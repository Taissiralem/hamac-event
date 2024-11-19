import "./NotFound.css";
import image404 from "../../assets/svg/404.svg";
import { Helmet } from "react-helmet";
const NotFound = () => {
  return (
    <>
     <Helmet>
            <title>Not Found </title>
         
        </Helmet>
      <div className="error-404">
        <h1 className="notfound-title">page not found !</h1>
        <img src={image404} alt="404 error" />
      </div>
    </>
  );
};

export default NotFound;
