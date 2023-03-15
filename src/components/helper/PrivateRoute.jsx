import { Spinner } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Outlet } from "react-router-dom";
import VerifyEmail from "../VerifyEmail";
import Login from "../Login";

const PrivateRoute = () => {
  const { currentUser } = useAuth();

  if (currentUser === undefined) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  } else if (currentUser && !currentUser.emailVerified) {
    return <VerifyEmail />;
  } else if (currentUser === null) {
    return <Login />;
  } else {
    return <Outlet />;
  }
};

export default PrivateRoute;
