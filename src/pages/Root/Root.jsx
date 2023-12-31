import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { HeaderLoginRegister } from "../../components/HeaderLoginRegister/HeaderLoginRegister";
import "./Root.scss";

export function Root() {

  const token = localStorage.getItem('token');

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