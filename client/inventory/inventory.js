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
const availabilityIn = document.getElementById("availabilityDropdown");
const submitButton = document.getElementById("saveChangesBtn");
const deleteButton = document.getElementById("deleteProductBtn");
const productForm = document.getElementById("editForm");

const inventoryTable = document.getElementById('inventory-body');

// const controller = new AbortController();

const hardFarmId = 'Apple_Farm';

function resetModalContents() {
  productNameIn.value='';
  descriptionIn.value='';
  quantityIn.value='';
  scaleDropdown.selectedIndex = '0';
  availabilityIn.selectedIndex = '0';
}




async function populateInventory(farmName) {
  const tableRows = inventoryTable.querySelectorAll("*");
  tableRows.forEach((row) => { row.remove(); });

  const productsUrl = '../api/farms_products/' + farmName;
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
      case "oz":
        abbrev = 'ounces';
        break;
      case "kg":
        abbrev = 'kilograms';
        break;
      case "count":
        abbrev = 'count';
        break;
      default:
        abbrev = 'none';
    }

    appendItem.innerHTML = `
    <td class="name-cell"><h5>${product["product_name"]}</h5></td>
    <td class="description-cell">${product["product_description"]}</td>
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
  if (scaleDropdown.selectedIndex == 0 | productNameIn.value == '') {
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
  // availabilityIn.value = productData[4];
  scaleDropdown.selectedIndex = selIndex;

  deleteButton.style.display = 'block';
  
  // handle submit button
  submitButtonHandler();
  submitButton.removeEventListener('click', createProduct);
  submitButton.removeEventListener('click', updateInventory);
  submitButton.addEventListener('click', updateInventory);
  // productForm.setAttribute('onsubmit', 'updateInventory()');
}

async function initModal(targetModal) {
  const editFields = document.querySelectorAll('.edit-form-control');

  const closeButtons = targetModal._element.querySelectorAll(".close-btn");
  closeButtons.forEach((button) => {
    button.addEventListener('click', async function (evt) {
      targetModal.hide();
      resetModalContents();
    });
  });
  
  deleteButton.addEventListener('click', deleteProduct);

  if (productModal._element.getAttribute('id') == 'editModal') {
    resetModalContents();
    scaleDropdown.addEventListener('change', submitButtonHandler);
    productNameIn.addEventListener('input', submitButtonHandler);
  }
}


async function fillCreateModal() {
  resetModalContents();
  if (productNameIn.getAttribute('disabled')) {
    productNameIn.removeAttribute('disabled');
  }
  productModal.show();

  deleteButton.style.display = 'none';
  
  submitButtonHandler();
  submitButton.removeEventListener('click', createProduct);
  submitButton.removeEventListener('click', updateInventory);
  submitButton.addEventListener('click', createProduct);
}

async function updateInventory(evt) {
  evt.preventDefault();
  const options = {
    method: 'PUT',
    body: JSON.stringify({
      product_name: productNameIn.value,
      product_description: descriptionIn.value,
      product_quantity: quantityIn.value,
      product_scale: scaleDropdown.value,
      is_available: availabilityIn.value
    }),
    headers: {
      'content-type': 'application/json; charset=UTF-8'
    }
  }
  
  try {
    const response = await fetch('../api/farms_products/'+hardFarmId, options);
    const data = await response.json();
    console.log(data['message']);
    productModal.hide();
    await populateInventory(hardFarmId);
  } catch (err) {
    console.error('Update unsuccessful');
  }
}

async function createProduct(evt) {
  evt.preventDefault();
  // alert("Product created");
  const options = {
    method: 'POST',
    body: JSON.stringify({
      product_name: productNameIn.value,
      product_description: descriptionIn.value,
      product_quantity: quantityIn.value,
      product_scale: scaleDropdown.value,
      is_available: availabilityIn.value
    }),
    headers: {
      'content-type': 'application/json; charset=UTF-8'
    }
  }

  try {
    const response = await fetch('../api/farms_products/'+hardFarmId, options);
    const data = await response.json();
    console.log(data);
    productModal.hide();
    await populateInventory(hardFarmId);
  } catch (err) {
    console.error('Unable to create new product.')
  }
  
}

async function deleteProduct(evt) {
  evt.preventDefault();
  const farmName = hardFarmId.replace('_', ' ');
  const options = {
    method: 'DELETE',
    body: JSON.stringify({
      product_name: productNameIn.value,
      farm_name: farmName
    }),
    headers: {
      'content-type': 'application/json; charset=UTF-8'
    }
  }
  
  try {
    const response = await fetch('../api/farms_products', options);
    const data = await response.json();
    console.log(data['message']);
    productModal.hide();
    await populateInventory(hardFarmId);
  } catch (err) {
    console.error('Unable to delete product');
  }
}



async function dataHandler() {
  const revertChangesModal = new bootstrap.Modal(document.getElementById('saveChangesModal'));
  await populateInventory(hardFarmId);
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