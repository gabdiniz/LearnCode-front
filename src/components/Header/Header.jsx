import { Container, Navbar } from "react-bootstrap";
import "./Header.scss";
import { Link } from "react-router-dom";

export function Header() {

  const info = JSON.parse(localStorage.getItem('userInfo'));
  const initials = info.first_name[0] + info.last_name[0];

  return (
    <Navbar expand="lg" className="header">
      <Container>
        <Navbar.Brand className="title-learnCode" as={Link} to="/home">LearnCode</Navbar.Brand>
        <Link className="avatar-initials" to="/perfil">{initials}</Link>
      </Container>
    </Navbar>
  );
}