import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Register } from "./pages/Register/Register";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext/AuthContext";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/cadastrar" element={<Register />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
      </AuthProvider>
    </>
  );
}

export default App;
