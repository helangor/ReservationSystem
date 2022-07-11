import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import companyService from "../../../services/company.service";
import { Company } from "../../../types/types";

const FetchCompany = () => {
  const { id } = useParams<string>();

  const [company, setCompany] = useState<Company>();

  useEffect(() => {
    var response = companyService.getCompanyById(id!);
    response.then((res) => setCompany(res.data));
  }, []);
  return { company };
};

export function CompanyControlPanel() {
  const { company } = FetchCompany();
  console.log({ company });
  return (
    <>
      <p>{company?.name}</p>
    </>
  );
}
