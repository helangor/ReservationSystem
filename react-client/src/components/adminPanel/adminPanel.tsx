import { Box, Tabs, Tab, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import companyService from "../../services/company.service";
import { Company } from "../../types/types";
import { CompanyEdit } from "../companies/companyEdit/companyEdit";
import Loading from "../general/loading";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export function AdminPanel() {
  const [company, setCompany] = useState<Company>();
  const { id } = useParams<string>();

  useEffect(() => {
    var response = companyService.getCompanyById(id!);
    response.then((res) => setCompany(res.data));
  }, []);

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  if (company) {
    return (
      <>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Varaukset" {...a11yProps(0)} />
            <Tab label="Tuotteiden muokkaus" {...a11yProps(1)} />
            <Tab label="Yrityksen muokkaus" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <p>Varaukset</p>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          <CompanyEdit company={company} />
        </TabPanel>
      </>
    );
  } else {
    return <Loading></Loading>;
  }
}
