import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Register } from "./pages/Register/Register";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext/AuthContext";
import { Login } from "./pages/Login/Login";
import { Root } from "./pages/Root/Root";
import { Profile } from "./pages/Profile/Profile";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Root />} >
              <Route path="/perfil" element={<Profile />} />
            </Route>
            <Route path="/cadastrar" element={<Register />} />
            <Route path="/entrar" element={<Login />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
      </AuthProvider>
    </>
  );
}

export default App;
