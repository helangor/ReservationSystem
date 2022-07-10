import axios from "axios";

const API_URL = "https://localhost:44383/api/Account/";

const register = async (username: string, password: string) => {
  return axios.post(API_URL + "signup", {
    username,
    password,
  });
};

const login = async (username: string, password: string) => {
  const response = await axios.post(API_URL + "login", {
    username,
    password,
  });
  if (response.data.token) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const isLoggedIn = () => {
  const user = localStorage.getItem("user");
  if (user && JSON.parse(user).token) {
    return true;
  }
  return false;
};

const authService = {
  register,
  login,
  logout,
  isLoggedIn,
};

export default authService;
