import CustomerDTO from "../dto/customerDTO.js";
import { customer_db, persistDatabases } from "../db/DB.js";
import { generateNextId } from "../assets/js/storageService.js";

//generate customer ID
function generateCustomerId() {
  return generateNextId(customer_db, "id", "C");
}

//add customer
const addNewCustomerRecord = (cus_id, name, address, contact, email) => {
  let customer = new CustomerDTO(cus_id, name, address, contact, email);

  customer_db.push(customer);
  persistDatabases();
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
  persistDatabases();
  return true;
};

//delete customer
const deleteCustomerRecord = (index) => {
  customer_db.splice(index, 1);
  persistDatabases();
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
