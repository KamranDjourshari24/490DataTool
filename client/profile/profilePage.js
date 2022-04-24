// const profileBlock = document.getElementById("profile-info-container");
// const invBlock = document.getElementById("inventory-tab");
// const allTabContainers = document.querySelectorAll("div.block.prof-tab-cont");
// const allTabs = document.querySelectorAll("tabs > ui li")

const profileTabs = document.querySelectorAll("li a");
const inventoryTable = document.getElementById('inventoryBody');
const hardFarmId = 'Apple_Farm';

async function selectTab() {
    
    // Activate the current tab.
    const activeTab = document.querySelector("li.is-active");
    activeTab.classList.remove('is-active');
    this.parentElement.classList.add("is-active");
    
    // Hide all boxes.
    const targetName = this.parentElement.getAttribute('containerId');
    const targetBox = document.getElementById(targetName);
    const allTabs = document.querySelectorAll('.block.prof-tab-cont');
    allTabs.forEach((tab) => {
        tab.style.display = "none";
    });

    targetBox.style.display = "block";
}

profileTabs.forEach((tab) => {
    tab.addEventListener("click", selectTab);
});



async function populateProfileInfo(farmName) {
  try {
    const response = await fetch('../api/urban_farms/' + farmName);
    const data = await response.json();

  } catch (err) {
    console.error('Unable to get profile information!');
  }
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
  
    let is_available
    switch (product["is_available"]) {
      case 1:
        is_available = "Yes";
        break;
      case 0:
        is_available = "No";
        break;
      default:
        is_available = "N/A";
    }
  
  
    appendItem.innerHTML = `
    <td class="name-cell"><h5>${product["product_name"]}</h5></td>
    <td class="description-cell">${product["product_description"]}</td>
    <td class="quantity-cell"><div class="quantity-text">${product["product_quantity"]}</div></td>
    <td class="unit-cell"><abbr title="${abbrev}">${product["product_scale"]}</abbr></td>
    <td class="avail-cell"><p>${is_available}</p></td>`;

    inventoryTable.append(appendItem);
  });

}

async function dataHandler() {
    const profileBlock = document.getElementById("profile-info-main");
    await populateInventory(hardFarmId);
}



async function windowActions() {
    await dataHandler();
  }

window.onload = windowActions;