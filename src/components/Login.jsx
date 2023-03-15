import { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import googleIcon from "../assets/googleIcon.svg";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, loginWithGoogle } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch (error) {
      setError("Failed to sign in");
    }

    setLoading(false);
  };

  const handleGoogleLogin = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await loginWithGoogle();
      navigate("/");
    } catch (error) {
      setError("Failed to sign in with Google");
    }

    setLoading(false);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && (
            <Alert variant="danger" className="text-center">
              {error}
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>

            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>

            <Button disabled={loading} className="w-100 mt-4" type="submit">
              LogIn
            </Button>
          </Form>

          <Button
            disabled={loading}
            className="w-100 mt-4 d-flex align-items-center justify-content-center"
            onClick={handleGoogleLogin}
            variant="light"
          >
            <img
              src={googleIcon}
              alt="Google Icon"
              style={{ width: "30px", marginRight: "20px" }}
            />
            LogIn With Google
          </Button>

          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">SignUp</Link>
      </div>
    </>
  );
};

export default Login;
