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

const exercisesApi = axios.create({
  baseURL: `${url}/exercise`,
  withCredentials: true,
});
const dietApi = axios.create({
  baseURL: `${url}/diet`,
  withCredentials: true,
});
const postApi = axios.create({
  baseURL: `${url}/post`,
  withCredentials: true,
});

export { authApi, dailyExerciseApi, exercisesApi, dietApi, postApi };
