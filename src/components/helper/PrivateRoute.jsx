import { Spinner } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { currentUser } = useAuth();

  // Se o currentUser ainda não foi definido, renderize um indicador de carregamento
  if (currentUser === undefined)
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  // Se currentUser for nulo, redirecione para a página de login
  else if (currentUser === null) return <Navigate to="/login" />;
  // Se currentUser for definido, renderize o Outlet
  else return <Outlet />;
};

export default PrivateRoute;
