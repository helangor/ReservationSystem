import { Button, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import companyService from "../../../services/company.service";
import { Company } from "../../../types/types";
import Loading from "../../general/loading";

interface EditCompanyAttribute {
  defaultValue: string | undefined;
  label: string | undefined;
  id: string | undefined;
}

export function CompanyEdit(props: any) {
  const [company, setCompany] = useState<Company>();

  useEffect(() => {
    setCompany(props.company);
  }, []);

  const editCompany = (event: any, company: Company) => {
    companyService.updateCompany(company);
  };

  const handleCompanyChange = (e: any) => {
    const { id, value } = e.target;
    setCompany((prevState: any) => ({
      ...prevState,
      [id]: value,
    }));
  };

  //TODO: Voisko tehdä mapperilla?
  const editFormAttributes: EditCompanyAttribute[] = [
    { defaultValue: company?.name, label: "Nimi", id: "name" },
    { defaultValue: company?.introduction, label: "Intro", id: "introduction" },
    { defaultValue: company?.email, label: "Email", id: "email" },
    {
      defaultValue: company?.phoneNumber,
      label: "Puhelinnumero",
      id: "phoneNumber",
    },
    { defaultValue: company?.city, label: "Kaupunki", id: "city" },
    { defaultValue: company?.address, label: "Osoite", id: "address" },
    {
      defaultValue: company?.postalCode,
      label: "Postinumero",
      id: "postalCode",
    },
  ];

  if (company)
    return (
      <Grid container direction="column" alignItems="center">
        <h1>Muokkaa yrityksen tietoja</h1>
        {editFormAttributes.map((c) => (
          <TextField
            key={c.label}
            defaultValue={c.defaultValue}
            id={c.id}
            label={c.label}
            variant="standard"
            onChange={handleCompanyChange}
          />
        ))}
        <Button onClick={(event) => editCompany(event, company)}>
          Muokkaa
        </Button>
      </Grid>
    );
  else {
    return <Loading></Loading>;
  }
}
