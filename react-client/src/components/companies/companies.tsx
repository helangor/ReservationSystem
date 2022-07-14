import { Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import companyService from "../../services/company.service";
import { Company } from "../../types/types";
import Loading from "../general/loading";
import { CompanyEdit } from "./companyEdit/companyEdit";

const FetchCompanies = () => {
  const [companies, setCompanies] = useState<Company[]>();

  useEffect(() => {
    var response = companyService.getCompaniesByUsername();
    response.then((res) => setCompanies(res.data));
  }, []);
  return { companies };
};

const selectCompany = () => {
  return (
    <>
      <p>a</p>
      <CompanyEdit></CompanyEdit>;
    </>
  );
};

export function Companies() {
  const { companies } = FetchCompanies();
  const navigate = useNavigate();

  if (!companies) {
    return <Loading></Loading>;
  } else if (companies.length === 1) {
    navigate(`/muokkaa/${companies[0].id}`, { replace: true });
    return <></>;
  }
  //Jos omistaa enemmän kuin yhden yrityksen niin voi valita mitä niistä muokkaa
  else {
    return (
      <Grid container direction="column" justifyContent="flex-start">
        {companies.map((c) => (
          <Link to={`/muokkaa/${c.id}`}>
            <Button onClick={selectCompany}>{c.introduction}</Button>
          </Link>
        ))}
      </Grid>
    );
  }
}
