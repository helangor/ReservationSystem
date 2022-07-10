import axios from "axios";

const API_URL = "https://localhost:44383/api/Account/";

const register = (username: string, password: string) => {
  return axios.post(API_URL + "signup", {
    username,
    password,
  });
};

const login = (username: string, password: string) => {
  return axios
    .post(API_URL + "login", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const isLoggedIn = () => {
  const user = localStorage.getItem("user");
  if (user) {
    const parsedUser = JSON.parse(user);
    if (parsedUser.token) {
      console.log(parsedUser.token);
      return true;
    }
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
