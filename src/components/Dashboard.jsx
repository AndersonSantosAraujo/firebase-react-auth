import { useState } from "react";
import { Button, Card, Alert, Badge, Image } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [error, setError] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setError("");

    try {
      await logout();
      navigate("/login");
    } catch (error) {
      setError("Failed to log out");
    }
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && (
            <Alert variant="danger" className="text-center">
              {error}
            </Alert>
          )}

          <div className="d-flex justify-content-center mb-5">
            {currentUser.photoURL ? (
              <Image
                height={96}
                width={96}
                src={currentUser.photoURL}
                roundedCircle
              />
            ) : (
              <div
                style={{
                  height: "96px",
                  width: "96px",
                  background: "#888",
                  borderRadius: "50%",
                }}
              ></div>
            )}
          </div>

          <div>
            <span style={{ marginRight: "10px" }}>
              Hello dear,{" "}
              {currentUser.displayName ? currentUser.displayName : "..."}
            </span>
          </div>

          <div>
            <strong>Your Email: </strong>
            {currentUser?.email}
          </div>

          <div>
            <strong>Account: </strong>
            <Badge bg="success">Verify</Badge>
          </div>

          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update profile
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  );
};

export default Dashboard;
