import { Button, Container, Navbar } from "react-bootstrap";
import "./HeaderLoginRegister.scss";
import { Link, useNavigate } from "react-router-dom";

export function HeaderLoginRegister({ path, button }) {

  const navigate = useNavigate();



  return (
    <Navbar expand="lg" className="header-login-register">
      <Container>
        <Navbar.Brand className="title-learnCode" as={Link} to="/home">LearnCode</Navbar.Brand>
        <Button className="btn-login-register" variant="transparent" onClick={() => navigate(path)}>{button}</Button>
      </Container>
    </Navbar>
  );
}