import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CSVLink } from "react-csv";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
  Button,
  TextField,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";

const plans = ["care", "light", "home", "connect", "navigate"];
const titles = ["שם פרטי", "שם משפחה", "טלפון", "מייל", "תכנית"];

function CustomersComp() {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [plan, setplan] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const getCustomers = async () => {
      try {
        let resp = await axios.get("http://localhost:8000/api/customers");
        setCustomers(resp.data);
        setFilteredCustomers(resp.data);
      } catch (err) {
        console.log(err);
      }
    };
    getCustomers();
  }, []);

  const handleChange = (event) => {
    setplan(event.target.value);
    let filteredSelectedItems = customers.filter(
      (cust) => cust.plan === event.target.value
    );
    setFilteredCustomers(filteredSelectedItems);
  };

  const addCustomerFunc = () => {
    navigate("/addCustomer");
  };

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;

    const filteredItems = customers.filter(
      (cust) =>
        cust.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cust.phone.includes(searchTerm)
    );
    setFilteredCustomers(filteredItems);
  };

  const csvData = [
    ["שם פרטי", "שם משפחה", "טלפון", "מייל", "תכנית"],
    ...filteredCustomers.map(({ firstname, lastname, email, phone, plan }) => [
      firstname,
      lastname,
      phone,
      email,
      plan,
    ]),
  ];

  return (
    <Box dir="rtl">
      <h1 style={{ textAlign: "center" }}>רשימת לקוחות</h1>
      <Stack
        spacing={2}
        direction="row"
        style={{ justifyContent: "space-around", marginBottom: "25px" }}
      >
        <Button variant="contained" onClick={addCustomerFunc}>
          הוספת לקוח
        </Button>
        <br />
        <br />

        <TextField
          id="outlined-search"
          label="חיפוש לקוח"
          type="search"
          onChange={handleInputChange}
        />
        <br />
        <br />

        <Box sx={{ minWidth: 150 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              חיפוש לפי תכנית
            </InputLabel>
            <Select
              value={plan}
              label=" חיפוש לפי תכנית"
              onChange={handleChange}
            >
              {plans.map((plan, index) => (
                <MenuItem key={index} value={plan}>
                  {plan}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <CSVLink
          className="downloadbtn"
          filename="רשימת לקוחות.csv"
          data={csvData}
        >
          הצגה בEXCEL
        </CSVLink>
      </Stack>
      <TableContainer>
        <Table
          dir="rtl"
          style={{ textAlign: "center" }}
          sx={{ minWidth: 650, padding: "20px" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              {titles.map((x, index) => {
                return (
                  <TableCell
                    key={index}
                    align="center"
                    style={{ fontWeight: "bold" }}
                  >
                    {x}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredCustomers.map((item, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{item.firstname}</TableCell>
                <TableCell align="center">{item.lastname}</TableCell>
                <TableCell align="center">{item.phone}</TableCell>
                <TableCell align="center">{item.email}</TableCell>
                <TableCell align="center">{item.plan}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default CustomersComp;
