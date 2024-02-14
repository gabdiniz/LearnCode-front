import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { HeaderLoginRegister } from "../../components/HeaderLoginRegister/HeaderLoginRegister";
import "./Root.scss";
import { useEffect } from "react";

export function Root() {

  const token = localStorage.getItem('token');
  const location = useLocation();
  const navigate = useNavigate()

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/home");
    }
  }, [navigate, location]);

  return (
    <div className="div-root">
      <header>
        {
          token
            ?
            <Header />
            :
            <HeaderLoginRegister path="/entrar" button="Entrar" />
        }
      </header>
      <main>
        <Outlet />
      </main>
      <footer>

      </footer>
    </div>
  );
};