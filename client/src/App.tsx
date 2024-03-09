import { Route, Routes } from "react-router-dom";
import Register from "./pages/auth/routes/Register";
import OtpHandler from "./pages/auth/routes/OtpHandler";
import Login from "./pages/auth/routes/Login";
import HomeBar from "./pages/app/_components/HomeBar";
import HomePage from "./pages/app/routes/HomePage";
import AuthProtector from "./pages/auth/_components/AuthProtector";
import StartExercise from "./pages/app/routes/StartExercise";
import ExerciseSchedule from "./pages/app/routes/ExerciseSchedule";
import DietSchedule from "./pages/app/routes/DietSchedule";
import MyProfile from "./pages/app/routes/MyProfile";
import CreatePost from "./pages/app/routes/CreatePost";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeBar />}>
        <Route index element={<HomePage />} />
        <Route path="startExercise" element={<StartExercise />} />
        <Route path="exerciseSchedule" element={<ExerciseSchedule />} />
        <Route path="dietSchedule" element={<DietSchedule />} />
        <Route path="dashboard">
          <Route index element={<MyProfile />} />
          <Route path="createPost" element={<CreatePost />} />
        </Route>
      </Route>
      <Route path="/auth" element={<AuthProtector />}>
        <Route path="register" element={<Register />} />
        <Route path="otpChecker" element={<OtpHandler />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
};

export default App;
