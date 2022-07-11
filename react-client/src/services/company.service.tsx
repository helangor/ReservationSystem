import axios from "axios";
import config from "../config.json";
import authService from "./auth.service";
const BASE_URL = config.BASE_URL;
const API_URL = BASE_URL + "Company/";

//TODO: Siirretään tämä headerin laitto jonnekkin mistä menee kaikkii api kutsuihin automaattisesti
const getCompaniesByUsername = async () => {
  const user = authService.getUser();

  return axios.get(
    API_URL + "get-companies-by-username?username=" + user?.username,
    {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    }
  );
};

const getCompanyById = async (id: string) => {
  const user = authService.getUser();

  return axios.get(API_URL + "get-company-by-product-id?productId=" + id, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });
};

const companyService = {
  getCompaniesByUsername,
  getCompanyById,
};

export default companyService;
