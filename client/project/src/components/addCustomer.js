import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Stack,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { MuiTelInput } from "mui-tel-input";

const plans = ["care", "light", "home", "connect", "navigate"];

function AddCustomerComp() {
  const [customer, setCustomer] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    plan: "",
  });
  const [phone, setPhone] = React.useState("");

  const navigate = useNavigate();
  const handleChange = (key, value) => {
    setCustomer({ ...customer, [key]: value });
  };

  const handleChangePhone = (newPhone) => {
    setPhone(newPhone);
    setCustomer({ ...customer, phone: phone });
  };

  const handleChangeSelect = (event) => {
    setCustomer({ ...customer, plan: event.target.value });
  };

  const addCustomerFunc = async (event) => {
    try {
      event.preventDefault();

      let resp = await axios.post(
        "http://localhost:8000/api/customers",
        customer
      );
      alert("לקוח נוסף בהצלחה!");
      navigate("/customers");
    } catch (err) {
      console.log("Unable to Add Customer", err);
    }
  };

  return (
    <div>
      <form onSubmit={addCustomerFunc}>
        <Box
          sx={{
            "& .MuiTextField-root": { m: 2 },
          }}
          style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto" }}
        >
          <h1> הוספת לקוח</h1>
          <TextField
            required
            type="text"
            onChange={(e) => handleChange("firstname", e.target.value)}
            label="שם פרטי"
          />
          <br />
          <TextField
            required
            label="שם משפחה"
            variant="outlined"
            onChange={(e) => handleChange("lastname", e.target.value)}
          />
          <br />
          <MuiTelInput
            style={{ width: "225px", borderRadius: "3px" }}
            value={phone}
            onChange={handleChangePhone}
            required
            label="טלפון"
          />
          <br />
          <TextField
            required
            type="email"
            label="מייל"
            variant="outlined"
            onChange={(e) => handleChange("email", e.target.value)}
          />
          <br />
          <br />
          <Box sx={{ minWidth: 150 }}>
            <FormControl style={{ minWidth: "220px" }}>
              <InputLabel id="demo-simple-select-label">תכנית</InputLabel>
              <Select
                required
                value={customer.plan}
                label=" תכנית"
                onChange={handleChangeSelect}
              >
                {plans.map((x, index) => (
                  <MenuItem key={index} value={x}>
                    {x}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <br />
          <Stack
            spacing={2}
            direction="row"
            style={{
              magin: "10px",
              padding: "10px",
              justifyContent: "space-evenly",
            }}
          >
            <Button variant="contained" type="submit">
              הוספה
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                navigate("/");
              }}
            >
              חזרה
            </Button>
          </Stack>
        </Box>
      </form>
    </div>
  );
}

export default AddCustomerComp;
