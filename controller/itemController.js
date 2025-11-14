import {
  generateItemId,
  addNewItemRecord,
  updateItemRecord,
  deleteItemRecord,
  getItemRecord,
  getAllItems,
  searchItemRecord,
} from "../model/itemModel.js";
import { openModal, closeModal } from "../assets/js/modalManager.js";

//add item
$("#btnAddItem").on("click", function () {
  const newItemId = generateItemId();
  const formHTML = `
    <div class="mb-3">
      <label for="itemId" class="form-label">Item ID</label>
      <input type="text" class="form-control" id="itemId" value="${newItemId}" readonly>
    </div>
    <div class="mb-3">
      <label for="itemName" class="form-label">Item Name</label>
      <input type="text" class="form-control" id="itemName">
    </div>
    <div class="mb-3">
      <label for="itemPrice" class="form-label">Item Price</label>
      <input type="number" class="form-control" id="itemPrice">
    </div>
    <div class="mb-3">
      <label for="itemQuantity" class="form-label">Item Quantity</label>
      <input type="number" class="form-control" id="itemQuantity">
    </div>
    <div class="mb-3">
      <label for="itemDescription" class="form-label">Item Description</label>
      <textarea class="form-control" id="itemDescription"></textarea>
    </div>
    <div class="mb-3">
      <label for="itemImage" class="form-label">Item Image</label>
      <input type="file" class="form-control" id="itemImage" accept="image/*">
    </div>
    <div class="mb-3">
     <img id="previewImage" src="" alt="Preview" class="img-fluid mt-2 d-none" style="max-height:150px; border-radius:8px;">
    </div>`;

  openModal("Add Item", formHTML, saveItem);
  handleImageSelection();
});

//handle image selection

const handleImageSelection = () => {
  $("#itemImage").on("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        base64Image = e.target.result;
        $("#previewImage").attr("src", base64Image).removeClass("d-none");
      };
      reader.readAsDataURL(file);
    }
  });
};
//save item
const saveItem = () => {
  const itemId = $("#itemId").val();
  const itemName = $("#itemName").val();
  const itemPrice = $("#itemPrice").val();
  const itemQuantity = $("#itemQuantity").val();
  const itemDescription = $("#itemDescription").val();
  const itemImage = base64Image || "";

  const isValid = validateFields(itemName, itemPrice, itemQuantity, itemDescription, itemImage);

  //validation
  if (!isValid) {
    return;
  }
  
  addNewItemRecord(
    itemId,
    itemName,
    itemPrice,
    itemQuantity,
    itemDescription,
    itemImage
  );

  closeModal();
  loadAllItems();

  // Sweet Alert for successful item addition
  Swal.fire({
    title: 'Success!',
    text: 'Item has been added successfully.',
    icon: 'success',
    confirmButtonText: 'OK',
    timer: 3000,
    timerProgressBar: true
  });
};

//update item
$(document).on("click", ".btnUpdateItem", function () {
  tbl_row = $(this).data("index");
  const item = getItemRecord(tbl_row);
  const formHTML = `
    <div class="mb-3">
      <label for="itemId" class="form-label">Item ID</label>
      <input type="text" class="form-control" id="itemId" value="${item.id}" readonly>
    </div>
    <div class="mb-3">
      <label for="itemName" class="form-label">Item Name</label>
      <input type="text" class="form-control" id="itemName" value="${item.name}">
    </div>
    <div class="mb-3">
      <label for="itemPrice" class="form-label">Item Price</label>
      <input type="number" class="form-control" id="itemPrice" value="${item.price}">
    </div>
    <div class="mb-3">
      <label for="itemQuantity" class="form-label">Item Quantity</label>
      <input type="number" class="form-control" id="itemQuantity" value="${item.quantity}">
    </div>
    <div class="mb-3">
      <label for="itemDescription" class="form-label">Item Description</label>
      <textarea class="form-control" id="itemDescription">${item.description}</textarea>
    </div>
    <div class="mb-3">
      <label for="itemImage" class="form-label">Item Image</label>
      <input type="file" class="form-control" id="itemImage" accept="image/*">
    </div>
    <div class="mb-3">
     <img id="previewImage" src="${item.image}" alt="Preview" class="img-fluid mt-2 d-none" style="max-height:150px; border-radius:8px;">
    </div>`;

  openModal("Update Item", formHTML, updateItem);
  handleImageSelection();
});

const updateItem =()=>{
  const itemId = $("#itemId").val();
  const itemName = $("#itemName").val();
  const itemPrice = $("#itemPrice").val();
  const itemQuantity = $("#itemQuantity").val();
  const itemDescription = $("#itemDescription").val();
  const itemImage = base64Image || "";

  const isValid = validateFields(itemName, itemPrice, itemQuantity, itemDescription, itemImage);

  if (!isValid) {
    return;
  }

  updateItemRecord(
    itemId,
    itemName,
    itemPrice,
    itemQuantity,
    itemDescription,
    itemImage,
    tbl_row
  );

  closeModal();
  loadAllItems();

  // Sweet Alert for successful item update
  Swal.fire({
    title: 'Updated!',
    text: 'Item has been updated successfully.',
    icon: 'success',
    confirmButtonText: 'OK',
    timer: 3000,
    timerProgressBar: true
  });
}

//delete item
$(document).on('click', '.btnDeleteItem',function () {
    tbl_row = $(this).data('index');
    
    // Sweet Alert confirmation for item deletion
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
        deleteItemRecord(tbl_row);
        closeModal();
        loadAllItems();
        
        // Sweet Alert for successful deletion
        Swal.fire({
          title: 'Deleted!',
          text: 'Item has been deleted successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
          timer: 3000,
          timerProgressBar: true
        });
      }
    });
})

//search items
$("#searchItem").on("input", function () {
  const searchText = $(this).val();
  const searchResults = searchItemRecord(searchText);
  $("#itemTableBody").empty();
  searchResults.forEach((item, index) => {
    const row = `
      <tr>
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.price}</td>
        <td>${item.quantity}</td>
        <td>${item.description}</td>
        <td><img src="${item.image}" alt="Item Image" style="max-height:50px; border-radius:8px;"></td>
        <td>
          <i class="fa-solid fa-pen-to-square me-2 btnUpdateItem" data-index="${index}"></i>
          <i class="fa-solid fa-trash-can btnDeleteItem" data-index="${index}"></i>
        </td>
      </tr>
    `;
    $("#itemTableBody").append(row);
  });
});
//load all items
const loadAllItems =()=>{
    $('#itemTableBody').empty();
    const items = getAllItems();
    items.forEach((item,index)=>{
        const row = `<tr>
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.price}</td>
        <td>${item.quantity}</td>
        <td>${item.description}</td>
        <td><img src="${item.image}" alt="Item Image" style="max-height:50px; border-radius:8px;"></td>
        <td>
          <i class="fa-solid fa-pen-to-square me-2 btnUpdateItem" data-index="${index}"></i>
          <i class="fa-solid fa-trash-can btnDeleteItem" data-index="${index}"></i>
        </td>
      </tr>`;
        $('#itemTableBody').append(row);
    })
};

//validate fields
function validateFields(itemName, itemPrice, itemQuantity, itemDescription, itemImage) {
  // Clear any existing errors first
  clearErrors();
  
  let isValid = true;
  
  if (itemName === "" || !isNaN(itemName)) {
    isValid = false;
    $("#itemName").css("border", "2px solid red");
    let error = `<div class="error text-danger small mt-1">Item Name is required and must be valid!</div>`;
    $("#itemName").after(error);
  }
  
  if (itemPrice === "" || isNaN(itemPrice) || parseFloat(itemPrice) <= 0) {
    isValid = false;
    $("#itemPrice").css("border", "2px solid red");
    let error = `<div class="error text-danger small mt-1">Item Price is required and must be a valid positive number!</div>`;
    $("#itemPrice").after(error);
  }
  
  if (itemQuantity === "" || isNaN(itemQuantity) || parseInt(itemQuantity) < 0) {
    isValid = false;
    $("#itemQuantity").css("border", "2px solid red");
    let error = `<div class="error text-danger small mt-1">Item Quantity is required and must be a valid non-negative number!</div>`;
    $("#itemQuantity").after(error);
  }
  
  if (itemDescription === "" || !isNaN(itemDescription)) {
    isValid = false;
    $("#itemDescription").css("border", "2px solid red");
    let error = `<div class="error text-danger small mt-1">Item Description is required and must be valid!</div>`;
    $("#itemDescription").after(error);
  }
  
  if (itemImage === "") {
    isValid = false;
    $("#itemImage").css("border", "2px solid red");
    let error = `<div class="error text-danger small mt-1">Item Image is required!</div>`;
    $("#itemImage").after(error);
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
  $("#itemName, #itemPrice, #itemQuantity, #itemDescription, #itemImage").css("border", "");
}

// Clean up error message when user focuses on input
$(document).on("focus", "#itemName, #itemPrice, #itemQuantity, #itemDescription, #itemImage", function () {
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

$(document).ready(()=>{
    loadAllItems();
})

let tbl_row = -1;
let base64Image = "";