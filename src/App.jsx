import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Register } from "./pages/Register/Register";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/cadastrar" element={<Register />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App;
