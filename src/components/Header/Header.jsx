import { Container, Navbar } from "react-bootstrap";
import "./Header.scss";
import { Link, useNavigate } from "react-router-dom";
import { BsChevronDown, BsBoxArrowRight, BsPerson } from "react-icons/bs";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext/AuthContext";

export function Header() {

  const info = JSON.parse(localStorage.getItem('userInfo'));
  const initials = info.first_name[0] + info.last_name[0];
  const [opcoesHeader, setOpcoesHeader] = useState(false);
  const { userLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  function onLogout() {
    userLogout();
    navigate("/entrar");
  }

  return (
    <Navbar expand="lg" className="header" onClick={() => opcoesHeader && setOpcoesHeader(!opcoesHeader)}>
      <Container>
        <Navbar.Brand className="title-learnCode" as={Link} to="/home">LearnCode</Navbar.Brand>
        <div>
          <div className="d-flex gap-3 align-items-center">
            <Link className="avatar-initials" to="/perfil">{initials}</Link>
            <span><BsChevronDown className="icons-header" onClick={() => setOpcoesHeader(!opcoesHeader)} /></span>
          </div>
          {
            opcoesHeader &&
            <div className="d-flex flex-column position-absolute div-opcoes-header">
              <span className="opcoes-header" onClick={() => navigate("/perfil")}><BsPerson className="icons-header" /> Perfil</span>
              <span className="opcoes-header" onClick={onLogout}><BsBoxArrowRight className="icons-header" /> Sair </span>
            </div>
          }
        </div>
      </Container>
    </Navbar>
  );
};