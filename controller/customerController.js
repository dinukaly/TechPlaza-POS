import { openModal, closeModal } from "../assets/js/modalManager.js";
import {
  generateCustomerId,
  addNewCustomerRecord,
  updateCustomerRecord,
  deleteCustomerRecord,
  getCustomerRecord,
  getAllCustomers,
  searchCustomerRecord
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
  const isValid = validateFields(name, address, contact, email);

  //validation
  if (!isValid) {
    return;
  }

    addNewCustomerRecord(id, name, address, contact, email);
    console.log(id,name,address,contact,email);
    
    closeModal();
    loadAllCustomers();

    // Sweet Alert for successful customer addition
    Swal.fire({
      title: 'Success!',
      text: 'Customer has been added successfully.',
      icon: 'success',
      confirmButtonText: 'OK',
      timer: 3000,
      timerProgressBar: true
    });

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

  // Sweet Alert for successful customer update
  Swal.fire({
    title: 'Updated!',
    text: 'Customer has been updated successfully.',
    icon: 'success',
    confirmButtonText: 'OK',
    timer: 3000,
    timerProgressBar: true
  });
}

//delete customer
$(document).on("click", ".btnDeleteCustomer", function () {
  tbl_row = $(this).data("index");
  
  // Sweet Alert confirmation for customer deletion
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      deleteCustomerRecord(tbl_row);
      closeModal();
      loadAllCustomers();
      
      // Sweet Alert for successful deletion
      Swal.fire({
        title: 'Deleted!',
        text: 'Customer has been deleted successfully.',
        icon: 'success',
        confirmButtonText: 'OK',
        timer: 3000,
        timerProgressBar: true
      });
    }
  });
});


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

//search customers
$("#searchCustomer").on("input", function () {
  const searchText = $(this).val();
  const searchResults = searchCustomerRecord(searchText);
  $("#customerTableBody").empty();
  searchResults.forEach((customer, index) => {
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
});

//validate fields
function validateFields(name, address, contact, email) {
  // Clear any existing errors first
  clearErrors();
  
  let isValid = true;
  
  if (name === "" || !isNaN(name)) {
    isValid = false;
    $("#name").css("border", "2px solid red");
    let error = `<div class="error text-danger small mt-1">Name is required and must be valid!</div>`;
    $("#name").after(error);
    
  }
  if (address === "" || !isNaN(address)) {
    isValid = false;
    $("#address").css("border", "2px solid red");
    let error = `<div class="error text-danger small mt-1">Address is required and must be valid!</div>`;
    $("#address").after(error);
   
  }
  if (contact === "" || isNaN(contact) || contact.length < 10) {
    isValid = false;
    $("#contact").css("border", "2px solid red");
    let error = `<div class="error text-danger small mt-1">Contact is required and must be a valid phone number (10+ digits)!</div>`;
    $("#contact").after(error);
    
  }
  if (email === "" || !email.includes("@") || !email.includes(".")) {
    isValid = false;
    $("#email").css("border", "2px solid red");
    let error = `<div class="error text-danger small mt-1">Email is required and must be valid!</div>`;
    $("#email").after(error);
    
  }

  return isValid;
}

// Function to clear all errors
function clearErrors() {
  // Remove all error messages
  $(".error").remove();
  // Clear the modal error area
  $("#formError").empty();
  // Reset all input borders
  $("#name, #address, #contact, #email").css("border", "");
}

// Clean up error message when user focuses on input
$(document).on("focus", "#name, #address, #contact, #email", function () {
  $(this).css("border", "");
  // Remove the specific error message for this field
  $(this).siblings(".error").remove();
  // Clear the modal error area if no more field errors
  if ($(".error").length === 0) {
    $("#formError").empty();
  }
});

// Clean up errors when modal is closed
$("#modal").on("hidden.bs.modal", function () {
  clearErrors();
});
//load all customers on page load
$(document).ready(()=>{
    loadAllCustomers();
})


let tbl_row;