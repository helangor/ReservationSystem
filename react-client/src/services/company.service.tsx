import axios from "axios";
import config from "../config.json";
import { Company } from "../types/types";
import authService from "./auth.service";
const BASE_URL = config.BASE_URL;
const API_URL = BASE_URL + "Company/";

//TODO: Siirretään tämä headerin laitto jonnekkin mistä menee kaikkii api kutsuihin automaattisesti. Axios configs?
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

const updateCompany = async (company: Company) => {
  const user = authService.getUser();
  axios.defaults.headers.common["Authorization"] = `Bearer ${user?.token}`;
  console.log(company);

  return axios({
    method: "PUT",
    url: API_URL + "update-company",
    data: {
      id: company.id,
      name: company.name,
      city: company.city,
      phoneNumber: company.phoneNumber,
      email: company.email,
      introduction: company.introduction,
      address: company.address,
      postalCode: company.postalCode,
    },
  });
};

const companyService = {
  getCompaniesByUsername,
  getCompanyById,
  updateCompany,
};

export default companyService;
