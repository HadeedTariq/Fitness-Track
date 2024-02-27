import { Route, Routes } from "react-router-dom";
import Register from "./pages/auth/routes/Register";
import OtpHandler from "./pages/auth/routes/OtpHandler";
import Login from "./pages/auth/routes/Login";

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
