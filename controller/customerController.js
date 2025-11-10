import { openModal, closeModal } from "../assets/js/modalManager.js";
import {
  generateCustomerId,
  addNewCustomerRecord,
  updateCustomerRecord,
  deleteCustomerRecord,
  getCustomerRecord,
  getAllCustomers,
} from "../model/customerModel.js";

//add customer
$("#btnAddCustomer").on("click", function () {
    const newCustomerId = generateCustomerId();
  const formHTML = `
    <div class="mb-3">
      <label>ID</label>
      <input type="text" id="id" class="form-control" placeholder="Enter ID" value="${newCustomerId}" readonly>
    </div>
    <div class="mb-3">
      <label>Name</label>
      <input type="text" id="name" class="form-control" placeholder="Enter Name">
    </div>
    <div class="mb-3">
      <label>Address</label>
      <input type="text" id="address" class="form-control" placeholder="Enter Address">
    </div>
    <div class="mb-3">
      <label>Contact</label>
      <input type="text" id="contact" class="form-control" placeholder="Enter Contact">
    </div>
    <div class="mb-3">
      <label>Email</label>
      <input type="email" id="email" class="form-control" placeholder="Enter Email">
    </div>`;

  openModal("Add Customer", formHTML, saveCustomer);
});

function saveCustomer() {
  const id = $("#id").val();
  const name = $("#name").val();
  const address = $("#address").val();
  const contact = $("#contact").val();
  const email = $("#email").val();

  //validation
  if (!id || !name || !address || !contact || !email) {
    alert("Please fill all fields");
    return;
  }

    addNewCustomerRecord(id, name, address, contact, email);
    console.log(id,name,address,contact,email);
    
    closeModal();
    loadAllCustomers();


}

//update customer
$(document).on("click", ".btnUpdateCustomer", function () {
  tbl_row = $(this).data("index");
  const customer = getCustomerRecord(tbl_row);
  $("#id").val(customer.id);
  $("#name").val(customer.name);
  $("#address").val(customer.address);
  $("#contact").val(customer.contact);
  $("#email").val(customer.email);
  const formHTML = `
    <div class="mb-3">
      <label>ID</label>
      <input type="text" id="id" class="form-control" value="${customer.id}" readonly>
    </div>
    <div class="mb-3">
      <label>Name</label>
      <input type="text" id="name" class="form-control" placeholder="Enter Name" value="${customer.name}">
    </div>
    <div class="mb-3">
      <label>Address</label>
      <input type="text" id="address" class="form-control" placeholder="Enter Address" value="${customer.address}">
    </div>
    <div class="mb-3">
      <label>Contact</label>
      <input type="text" id="contact" class="form-control" placeholder="Enter Contact" value="${customer.contact}">
    </div>
    <div class="mb-3">
      <label>Email</label>
      <input type="email" id="email" class="form-control" placeholder="Enter Email" value="${customer.email}">
    </div>`;
  openModal("Update Customer", formHTML, saveUpdatedCustomer);
});

function saveUpdatedCustomer() {
  const id = $("#id").val();
  const name = $("#name").val();
  const address = $("#address").val();
  const contact = $("#contact").val();
  const email = $("#email").val();

  updateCustomerRecord(id, name, address, contact, email, tbl_row);
  closeModal();
  loadAllCustomers();
}


//load all customers

const loadAllCustomers = () => {
  $("#customerTableBody").empty();
  const customers = getAllCustomers();
  customers.forEach((customer, index) => {
    const row = `
      <tr>
        <td>${customer.id}</td>
        <td>${customer.name}</td>
        <td>${customer.address}</td>
        <td>${customer.contact}</td>
        <td>${customer.email}</td>
        <td>
          <i class="fa-solid fa-pen-to-square me-2 btnUpdateCustomer" data-index="${index}"></i>
          <i class="fa-solid fa-trash-can btnDeleteCustomer" data-index="${index}"></i>
        </td>
      </tr>
    `;
    $("#customerTableBody").append(row);
  });
};

let tbl_row;