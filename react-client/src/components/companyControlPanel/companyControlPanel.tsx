import { useEffect, useState } from "react";
import companyService from "../../services/company.service";
import { Company } from "../../types/types";

const FetchCompanies = () => {
  const [test, setTest] = useState<Company[]>();

  useEffect(() => {
    var data = companyService.getCompaniesByUsername();
    data.then((o) => setTest(o.data));
    console.log(test);
  }, []);
  return { test };
};

export default function companyControlPanel() {
  const { test } = FetchCompanies();
  console.log(test);

  if (!test) {
    return <p>Loaging...</p>;
  } else {
    return (
      <>
        <p>{test[0].email}</p>
        <p>{test[0].introduction}</p>
        <p>{test[0].name}</p>

        <p>Control panel</p>
      </>
    );
  }
}
