import axios from "axios";
import config from "../config.json";
import { UserDto } from "../types/types";
const BASE_URL = config.BASE_URL;

const API_URL = BASE_URL + "Account/";

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
  const user = parseUserFromLocalStorage();
  return user ? true : false;
};

const parseUserFromLocalStorage = () => {
  const user = localStorage.getItem("user");
  if (user) {
    const parsedUser: UserDto = JSON.parse(user);
    return parsedUser;
  }
  return;
};

const getUser = () => {
  const user = parseUserFromLocalStorage();
  return user;
};

const authService = {
  register,
  login,
  logout,
  isLoggedIn,
  getUser,
};

export default authService;
