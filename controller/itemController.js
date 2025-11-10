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
$('#btnAddItem').on('click', function() {
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
});

//handle image selection

$('#itemImage').on('change', function(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      base64Image = e.target.result;
      $("#previewImage").attr("src", base64Image).removeClass("d-none");
    };
    reader.readAsDataURL(file);
  }
});
//save item
const saveItem = () => {
  const itemId = $("#itemId").val();
  const itemName = $("#itemName").val();
  const itemPrice = $("#itemPrice").val();
  const itemQuantity = $("#itemQuantity").val();
  const itemDescription = $("#itemDescription").val();
  const itemImage = base64Image || "";

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
};

let base64Image = "";