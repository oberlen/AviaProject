import "./App.css";
import CustomersComp from "./components/customers";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddCustomerComp from "./components/addCustomer";

function App() {
  return (
    <div dir="rtl">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CustomersComp />} />
          <Route path="/customers" element={<CustomersComp />} />
          <Route path="/addCustomer" element={<AddCustomerComp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
