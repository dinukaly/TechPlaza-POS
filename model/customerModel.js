import CustomerDTO from "../dto/customerDTO.js";
import { customer_db } from "../db/DB.js";

//generate customer ID
function generateCustomerId() {
  if (customer_db.length === 0) return "C001";

  // Get last customer ID
  const lastId = customer_db[customer_db.length - 1].id;

  // Extract the numeric part and increment
  const num = parseInt(lastId.substring(1)) + 1;

  // Pad with zeros (1 -> 001, 12 -> 012)
  return "C" + num.toString().padStart(3, "0");
}

//add customer
const addNewCustomerRecord = (cus_id, name, address, contact, email) => {
  console.log(cus_id, name, address, contact, email);

  let customer = new CustomerDTO(cus_id, name, address, contact, email);
  console.log(customer);

  customer_db.push(customer);
};

//update customer
const updateCustomerRecord = (
  cus_id,
  name,
  address,
  contact,
  email,
  tbl_row
) => {
  let customer = new CustomerDTO(cus_id, name, address, contact, email);
  customer_db[tbl_row] = customer;
  return true;
};

//delete customer
const deleteCustomerRecord = (index) => {
  customer_db.splice(index, 1);
};

//get customer
const getCustomerRecord = (index) => {
  return customer_db[index];
};

//get all customers
const getAllCustomers = () => {
  return customer_db;
};

//search customers
const searchCustomerRecord = (searchText) => {
  return customer_db.filter((customer) =>
    customer.name.toLowerCase().includes(searchText.toLowerCase())
  );
};

export {
  generateCustomerId,
  addNewCustomerRecord,
  updateCustomerRecord,
  deleteCustomerRecord,
  getCustomerRecord,
  getAllCustomers,
  searchCustomerRecord,
};
