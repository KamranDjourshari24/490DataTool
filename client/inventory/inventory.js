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

const inventoryTable = document.getElementById('inventory-body');

async function populateInventory(farmId) {

  const productsUrl = '/api/farms_products/' + farmId;
  const response = await fetch(productsUrl);
  const invData = await response.json();
  
  invData.forEach((product) => {
    const appendItem = document.createElement("tr");
    appendItem.classList.add("table-row")
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
    <td><h5>${product["product_name"]}</h5></td>
    <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</td>
    <td class="quantity-cell"><div class="quantity-text">${product["product_quantity"]}</div></td>
    <td class="unit-cell"><abbr title="${abbrev}">${product["product_scale"]}</abbr></td>`;

    inventoryTable.append(appendItem);
  });
}

async function generateEditUI() {
  
  const actBtnContainer = document.getElementById("action-button-container");
  const itemRows = document.querySelectorAll("tr.table-row");

  // Remove edit button.
  const editButton = document.getElementById("edit-inv-btn");
  editButton.remove();

  // Create submit button. Will save changes to form.
  const submitButton = document.createElement("button");
  submitButton.classList.add("btn");
  submitButton.classList.add("btn-primary");
  submitButton.setAttribute("id", "submit-inv-btn");
  submitButton.textContent = "Save Changes";
  submitButton.addEventListener('click', updateInventory);
  actBtnContainer.append(submitButton);

  // Create cancel button. Reverts all changes on page.
  const cancelButton = document.createElement("button");
  cancelButton.classList.add("btn");
  cancelButton.classList.add("btn-secondary");
  cancelButton.setAttribute("id", "cancel-inv-btn");
  cancelButton.textContent = "Cancel";
  cancelButton.addEventListener('click', async function(evt) {
    itemRows.forEach((row) => {
      row.remove();
    }); 
    submitButton.remove();
    cancelButton.remove();
    await populateInventory('2');
    actBtnContainer.append(editButton);
  });
  actBtnContainer.append(cancelButton);

  // Add delete button to each row.
  itemRows.forEach((row) => {
    const appDelete = document.createElement("td");
    appDelete.classList.add("tabel-row");
    appDelete.innerHTML = `<button class="btn btn-light" alt="delete product"><i class="fa-solid fa-x"></i></button>`;
    row.append(appDelete);
    const delButton = appDelete.querySelector("button.btn");

    delButton.addEventListener('click', (evt) => {
      row.remove();
    });
  });

  const quantityBoxes = document.querySelectorAll(".quantity-cell");

  quantityBoxes.forEach((box) => {

    // Divide into columns for form
    const originalQuantity = box.textContent;
    
    let currentQuantity = box.textContent;
    box.innerHTML = '';

    const quantCont = document.createElement("div");
    quantCont.classList.add("container");

    const newCol = document.createElement("div");
    newCol.classList.add("row");
    
    newCol.innerHTML = `
    <div class="col-1 quant-text-col"></div>
    <div class="col-1 quant-btn-col"></div>`;
    
    quantCont.append(newCol);
    box.append(quantCont);
    // Add text box for input
    const textCol = box.querySelector(".quant-text-col");
    const textBox = document.createElement("input");
    textBox.classList.add("quant-text-box");
    textBox.setAttribute('type', 'number');
    textBox.setAttribute('value', originalQuantity);
    textBox.setAttribute('min', '1');
    textBox.innerHTML = `${box.textContent}`;
    // textBox.style.width = '40px'
    textCol.append(textBox);

    // Add modification buttons
    const btnCol = box.querySelector(".quant-btn-col");
    const buttonGroup = document.createElement("div");

    buttonGroup.classList.add("quantity-buttons");
    // buttonGroup.classList.add("btn-group");
    buttonGroup.classList.add("btn-group-sm");
    buttonGroup.classList.add("btn-group-vertical");
    buttonGroup.setAttribute("role", "group");
    buttonGroup.innerHTML = `
    <button type="button" class="btn btn-secondary quantity-button-text btn-increase">+</button>
    <button type="button" class="btn btn-secondary quantity-button-text btn-decrease">-</button>`;
    btnCol.append(buttonGroup);

    newCol.classList.add("justify-content-left");
  });

  // Addition handling
  const addButtons = document.querySelectorAll(".btn-increase");
  
  async function addQuant(evt) {
    const textBox = evt.target.parentNode.parentNode.parentNode.querySelector(".quant-text-box");
    textBox.stepUp();
  }


  addButtons.forEach((btn) => {
    btn.addEventListener('click', addQuant);
  });

  // Subtraction handling
  const subButtons = document.querySelectorAll(".btn-decrease");
  
  async function subQuant(evt) {
    const textBox = evt.target.parentNode.parentNode.parentNode.querySelector(".quant-text-box");
    if (textBox.value >= textBox.min) {
      textBox.stepDown();
    } else {
      await floorButton(textBox);
    }
  }


  subButtons.forEach((btn) => {
    btn.addEventListener('click', subQuant);
  });

  // Disable minus button if number less than 0.
  const textBoxes = document.querySelectorAll(".quant-text-box");
  
  async function floorButton(tbox) {
    const decButton = tbox.parentNode.parentNode.querySelector(".btn-decrease");
    if (tbox.value <= tbox.min) {
      decButton.setAttribute('disabled', true);
    } else {
      decButton.removeAttribute('disabled');
    }
  }


  textBoxes.forEach((tbox) => {
    floorButton(tbox);
    tbox.addEventListener('change', async function(evt) {
      await floorButton(evt.target);
    });
  });

  const allQuantButtons = document.querySelectorAll(".btn-increase, .btn-decrease");

  allQuantButtons.forEach((btn) => {
    btn.addEventListener('click', async function(evt) {
      const textBox = evt.target.parentNode.parentNode.parentNode.querySelector(".quant-text-box");
      await floorButton(textBox);
    });
  });
}

async function updateInventory() {
  const tableRows = inventoryTable.querySelectorAll("*");
  tableRows.forEach((row) => { row.remove(); });
  await populateInventory('2');
  alert("Submitted!");
}



async function dataHandler() {
  await populateInventory('2');
  // await generateEditUI();

  // const quantityBoxes = document.querySelectorAll(".quantity-cell");
}



async function windowActions() {
  await dataHandler();
}

window.onload = windowActions;