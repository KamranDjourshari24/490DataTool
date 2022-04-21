// const text = require("body-parser/lib/types/text");
// Author: Jonah Pool
// Email: jonahpool99@gmail.com
// ************************************************************************************************
// Description:
//    Inventory display page for a farm, which also allows for editing, adding, and removing items.
//    
//    This page should ONLY be accessible by a logged in user. Security protocols must be added to 
//    avoid misuse.
// ************************************************************************************************

import { request } from "express";

async function disableButton(btn) {
  btn.setAttribute('disabled', true);
}

async function enableButton(btn) {
  btn.removeAttribute("disabled");
}
const productModal = new bootstrap.Modal(document.getElementById('editModal'));
const productNameIn = document.getElementById("productNameControllerInput1");
const descriptionIn = document.getElementById("descriptionControllerInput2");
const quantityIn = document.getElementById("quantityContorllerInput3");
const scaleDropdown = document.getElementById("scaleDropdown");
const submitButton = document.getElementById("saveChangesBtn");
const productForm = document.getElementById("editForm");

const inventoryTable = document.getElementById('inventory-body');

const controller = new AbortController();

function resetModalContents() {
  productNameIn.value='';
  descriptionIn.value='';
  quantityIn.value='';
  scaleDropdown.selectedIndex = '0';
  
  // try {
  //   submitButton.removeEventListener('submit', createProduct);
  // } catch {
  //   submitButton.removeEventListener('submit', updateInventory);
  // }
}




async function populateInventory(farmId) {
  const tableRows = inventoryTable.querySelectorAll("*");
  tableRows.forEach((row) => { row.remove(); });

  const productsUrl = '/api/farms_products/' + farmId;
  const response = await fetch(productsUrl);
  const invData = await response.json();
  
  invData.forEach((product) => {
    const appendItem = document.createElement("tr");
    appendItem.classList.add("table-row");
    let abbrev;
    switch (product["product_scale"]) {
      case "lbs":
        abbrev = 'pounds';
        break;
      case "kg":
        abbrev = 'kilograms';
        break;
      case "n":
        abbrev = 'count';
        break;
      default:
        abbrev = 'none';
    }

    appendItem.innerHTML = `
    <td class="name-cell"><h5>${product["product_name"]}</h5></td>
    <td class="description-cell">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</td>
    <td class="quantity-cell"><div class="quantity-text">${product["product_quantity"]}</div></td>
    <td class="unit-cell"><abbr title="${abbrev}">${product["product_scale"]}</abbr></td>
    <td class="edit-inv-cell-btn"><button type="button" class="btn btn-primary edit-btn" data-modal-type="editProduct" data-bs-toggle="modal" data-bs-target="#editModal"><i class="fas fa-edit"></i></button></td>`;


    const editButton = appendItem.querySelector(".edit-btn");
    editButton.addEventListener('click', async (evt) => {
      resetModalContents();
      await fillEditModal(appendItem);
      productModal.show();
    });

    inventoryTable.append(appendItem);
  });
}

async function submitButtonHandler() {
  if (scaleDropdown.selectedIndex == 0) {
    await disableButton(submitButton);
  } else {
    await enableButton(submitButton);
  }
}




async function fillEditModal(row) {
  const invColumns = row.querySelectorAll('td[class$="-cell"]');

  // Collect product data from table row.
  let productData = [];
  invColumns.forEach((col) => {
    productData.push(col.textContent);
  });

  //Populate product name.
  productNameIn.value = productData[0];
  productNameIn.setAttribute('disabled', true);

  // Populate description box
  descriptionIn.value = productData[1];
  
  // Populate quantity input box
  quantityIn.value = productData[2];

  // Populate scale dropdown
  let selIndex;
  switch (productData[3]) {
    case "lbs":
      selIndex = '1';
      break;
    case "oz":
      selIndex = '2';
      break;
    case "kg":
      selIndex = '3';
      break;
    case "count":
      selIndex = '4';
      break;
    default:
      selIndex = '0';
  }

  scaleDropdown.selectedIndex = selIndex;
  // handle submit button
  submitButtonHandler();
  submitButton.removeEventListener('click', createProduct);
  submitButton.removeEventListener('click', updateInventory);
  submitButton.addEventListener('click', await updateInventory, {signal: controller.signal});
  // productForm.setAttribute('onsubmit', 'updateInventory()');
}

async function initModal(targetModal) {

  // productNameIn.addEventListener('change', add)
  // descriptionIn
  // quantityIn
  // scaleDropdown
  // submitButton
  const editFields = document.querySelectorAll('.edit-form-control');
  



  const closeButtons = targetModal._element.querySelectorAll(".close-btn");
  closeButtons.forEach((button) => {
    button.addEventListener('click', async function (evt) {
      targetModal.hide();
      resetModalContents();
    });
  });


  if (productModal._element.getAttribute('id') == 'editModal') {
    resetModalContents();
    scaleDropdown.addEventListener('change', submitButtonHandler);
  }
}


async function fillCreateModal() {
  resetModalContents();
  if (productNameIn.getAttribute('disabled')) {
    productNameIn.removeAttribute('disabled');
  }
  productModal.show();
  submitButtonHandler();
  console.log('here');
  submitButton.removeEventListener('click', createProduct);
  submitButton.removeEventListener('click', updateInventory);

  submitButton.addEventListener('click', createProduct, {signal: controller.signal});
}

async function updateInventory(evt) {
  evt.preventDefault();
  alert("Product updated");
  await populateInventory('2');
}

async function createProduct(evt) {
  evt.preventDefault();
  alert("Product created");
  
  await populateInventory('2');
}



async function dataHandler() {
  const revertChangesModal = new bootstrap.Modal(document.getElementById('saveChangesModal'));
  await populateInventory('2', productModal);
  await initModal(productModal);
  await initModal(revertChangesModal);
  const createButton = document.getElementById("newProductButton");
  createButton.addEventListener('click', async function (evt) {
    await fillCreateModal();
  });
}



async function windowActions() {
  await dataHandler();
}

window.onload = windowActions;