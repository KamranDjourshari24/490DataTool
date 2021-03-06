// const profileBlock = document.getElementById("profile-info-container");
// const invBlock = document.getElementById("inventory-tab");
// const allTabContainers = document.querySelectorAll("div.block.prof-tab-cont");
// const allTabs = document.querySelectorAll("tabs > ui li")

const profileTabs = document.querySelectorAll(".tabs li a");
const inventoryTable = document.getElementById('inventoryBody');


async function getData(url) {
  const response = await fetch(url);
  const data = await response.json()
  return data;
}

async function getFarmInfo(farmName) {
  const url = '../api/urban_farms/' + farmName;
  const farmsList = await getData(url);
  const farmInfo = farmsList[0];
  return farmInfo;
}

async function selectTab() {
    
  // Activate the current tab.
  const activeTab = document.querySelector(".tabs li.is-active");
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

async function farmInfoForm(farmName) {


}


async function populateProfileInfo(farmName) {
  const farmTitle = document.querySelector('#farm-name strong');
  const addressBlock = document.getElementById('addressContent');
  const contactInfoBlock = document.getElementById('contactInfoContent');
  const addInfoBlock = document.getElementById('additionalInfoContent');
  const nameBlock = document.getElementById('nameContent');
  try {
    const farmInfo = await getFarmInfo(farmName);

    farmTitle.textContent = farmInfo['farm_name'];

    let line2;
    if (farmInfo['address2'] != '') {
      line2 = `</br>${farmInfo['address2']}`;
    } else {
      line2 = ``;
    }

    addressBlock.innerHTML = `
    ${farmInfo['address1']}${line2}</br>
    ${farmInfo['city']}, MD ${farmInfo['zipcode']}`;
    
    contactInfoBlock.innerHTML = `
    <b>Phone Number: </b>${farmInfo['phone_number']}</br>
    <b>Email: </b>${farmInfo['email']}</br>
    <b>Website: </b>${farmInfo['website']}`;

    let additionalInfo = farmInfo['additional_info'];
    if (additionalInfo.startsWith('"')) {
      additionalInfo = additionalInfo.slice(1);
    }
    if (additionalInfo.endsWith('"')) {
      additionalInfo = additionalInfo.slice(0,-1);
    }
    addInfoBlock.innerHTML = additionalInfo.trim();

    nameBlock.innerHTML = `
    <b>First Name: </b>${farmInfo['fname']}</br>
    <b>Last Name: </b>${farmInfo['lname']}`;
  } catch (err) {
    console.error('Unable to get profile information!');
  }

  
} 

async function populateInventory(farmName) {
  const tableRows = inventoryTable.querySelectorAll("*");
  tableRows.forEach((row) => { row.remove(); });
  
  const productsUrl = '../api/farms_products/' + farmName;
  const invData = await getData(productsUrl);

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
  
    let is_available;
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


async function showForm(farmName) {


  const activeTab = document.querySelector(".tabs li.is-active");
  const containerId = activeTab.getAttribute('containerId');

  if (containerId.startsWith('farm')) {
    const addressBlock = document.getElementById('addressContent');
    const contactInfoBlock = document.getElementById('contactInfoContent');
    const addInfoBlock = document.getElementById('additionalInfoContent');

    const farmInfo = await getFarmInfo(farmName);



  } else if (containerId.startsWith('profile')) {

    

  } else {
    console.alert('not a valid form');
    return;
  }

  const tabContent = document.getElementById(containerId);
  const editButtons = tabContent.querySelector('.edit-btn');
  editButtons.classList.add('is-hidden');

  const formButtons = tabContent.querySelector('.form-btns');
  formButtons.classList.remove('is-hidden');
  formButtons.querySelectorAll("button").forEach((elm) => {
    elm.removeAttribute('disabled');
  });
}



async function dataHandler() {
  const profileBlock = document.getElementById("profile-info-main");
  const farmStr = sessionStorage.getItem('farmName');
  console.log(farmStr);
  await populateProfileInfo(farmStr);
  await populateInventory(farmStr);
}


async function windowActions() {
  await dataHandler();

  profileTabs.forEach((tab) => {
    tab.addEventListener("click", selectTab);
  });
  // const updateButtons = document.querySelectorAll('.all-btns');
  // updateButtons.forEach((btn) => {
  //   btn.addEventListener('click', showForm);
  // });
  

}

window.addEventListener('load', windowActions);