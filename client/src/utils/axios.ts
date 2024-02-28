import axios from "axios";
let url = import.meta.env.VITE_BACKEND_URL;

const authApi = axios.create({
  baseURL: `${url}/user`,
  withCredentials: true,
});
const dailyExerciseApi = axios.create({
  baseURL: `${url}/dailyExercise`,
  withCredentials: true,
});

export { authApi, dailyExerciseApi };
