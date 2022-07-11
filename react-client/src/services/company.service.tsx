import axios from "axios";
import config from "../config.json";
import authService from "./auth.service";
const BASE_URL = config.BASE_URL;
const API_URL = BASE_URL + "Company/";

//TODO: Siirretään tämä headerin laitto jonnekkin mistä menee kaikkii api kutsuihin automaattisesti
//TODO: Jos vain yksi yritys menee suoraan sen sivulle. Muuten näyttää kaikki yritykset heti
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

const companyService = {
  getCompaniesByUsername,
};

export default companyService;
