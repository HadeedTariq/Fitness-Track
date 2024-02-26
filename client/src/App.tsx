import { Route, Routes } from "react-router-dom";
import Register from "./pages/auth/_components/Register";
import OtpHandler from "./pages/auth/_components/OtpHandler";
import Login from "./pages/auth/_components/Login";

const App = () => {
  return (
    <Routes>
      <Route path="/auth">
        <Route path="register" element={<Register />} />
        <Route path="otpChecker" element={<OtpHandler />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
};

export default App;
