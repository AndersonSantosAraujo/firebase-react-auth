import { useState, useEffect } from "react";
import { Alert, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const VerifyEmail = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState(false);
  const navigate = useNavigate();
  const { currentUser, resendEmailVerification } = useAuth();

  useEffect(() => {
    if (currentUser === null) navigate("/login");
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resendEmailVerification();
      setMessage(
        "E-mail de verificação reenviado! Aguarde 5 segundos para ser redirecionado...",
      );
    } catch (error) {
      setError(
        "Falha ao tentar reenviar o e-mail de verificação! Tente novamente mais tarde.",
      );
      setLoading(false);
    }
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h4 className="text-center mb-4">Verifique seu Endereço de E-mail</h4>

          {error && (
            <Alert variant="danger" className="text-center">
              {error}
            </Alert>
          )}

          {message && (
            <Alert variant="success" className="text-center">
              {message}
            </Alert>
          )}

          <p className="text-center">
            <strong>Um e-mail de verificação foi enviado para:</strong>
          </p>
          <p className="text-center">{currentUser && currentUser.email}</p>
          <p className="text-center mt-4">
            Siga as instruções no e-mail para verificar a conta.
          </p>
          <Button
            disabled={loading}
            className="w-100 mt-4"
            onClick={handleClick}
          >
            Reenviar E-mail
          </Button>
        </Card.Body>
      </Card>

      <div className="w-100 text-center mt-2">
        Já tem uma conta? <Link to="/login">Entre</Link>
      </div>
    </>
  );
};

export default VerifyEmail;
