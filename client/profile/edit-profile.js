// import { redirect } from "express/lib/response";


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

async function updateFarmInfo(ev) {
  ev.preventDefault();
  
  const farmName = sessionStorage.getItem('farmName');
  const farmInfo = await getFarmInfo(farmName);
  let jsonBody = {
    farm_name: farmName,
    fname: farmInfo['fname'],
    lname: farmInfo['lname'],
    latitude: farmInfo['latitude'],
    longitude: farmInfo['longitude']
  }

  const usedFields = ['address1', 'address2', 'city', 'zipcode', 'phone_number', 'email', 'website', 'additional_info'];
  usedFields.forEach((field) => {
    const thisIn = document.querySelector(`input[name=${field}], textarea[name=${field}]`);
    // console.log(field, thisIn);
    jsonBody[field] = thisIn.value;
  });
  const options = {
    method: 'PUT',
    body: JSON.stringify(jsonBody),
    headers: {
      'content-type': 'application/json; charset=UTF-8'
    }
  }
  
  try {
    const response = await fetch('../api/urban_farms', options);
    const resData = await response.json();
    window.location.href = './index.html';
    // const data = await response.json();
    // console.log(data['message']);
    // await populateInventory(hardFarmId);
  } catch (err) {
    console.error('Update unsuccessful');
  }
}

async function populateForm(farmName) {
  try {
    const farmInfo = await getFarmInfo(farmName);
    const usedFields = ['address1', 'address2', 'city', 'zipcode', 'phone_number', 'email', 'website', 'additional_info'];
    usedFields.forEach((field) => {
      const thisIn = document.querySelector(`input[name=${field}], textarea[name=${field}]`);
      // console.log(field, thisIn);
      thisIn.value = farmInfo[`${field}`];
    });
    
  } catch (err) {
    console.log(err);
  }
}


async function windowActions() {
  const farmStr = sessionStorage.getItem('farmName');
  await populateForm(farmStr);
  const submitButton = document.getElementById('save-button');
  submitButton.addEventListener('click', updateFarmInfo);
}

window.onload = windowActions;