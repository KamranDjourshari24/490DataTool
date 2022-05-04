const user = document.getElementById('username');
const pw = document.getElementById('password');
const fName = document.getElementById('firstName');
const lName = document.getElementById('lastName');
const farm = document.getElementById('farmName');
const address1 = document.getElementById('farmAddress1');
const address2 = document.getElementById('farmAddress2');
const city = document.getElementById('farmCity');
const zip = document.getElementById('farmZipcode');
const phoneNumber = document.getElementById('farmPhoneNum');
const email = document.getElementById('farmEmail');
const btn = document.getElementById('submitBtn');
const cb = document.getElementById('termCB');
const website = document.getElementById('farmWebsite');
const description = document.getElementById('farmDesc');
var ownerId;
let lat;
let lon;

var farmName;

async function createFarm(e) {
    e.preventDefault();
    if (checkbox(cb) == true) {
        const input = Array.from(document.getElementById('farmForm').querySelectorAll(('input, textarea')));
        input.forEach((field) => {
            const parent = document.getElementById(field.id).parentElement;
            const fieldvalue = field.value.trim();
            const warning = parent.nextElementSibling !== null;
            if ((warning === false) && (fieldvalue === '') || (field.classList.contains('cityZip'))) {
              if (!field.classList.contains('no-warning')) {
                parent.insertAdjacentHTML('afterend', '<p class="help is-danger">This field is required</p>');
            }
          } else if ((warning === true) && ((fieldvalue !== '')) && (!field.classList.contains('terms-agree'))) {
            parent.nextElementSibling.remove();
          }
        });
    
        try {
            if ((address1.value !== '') || (city.value !== '')) {
                const latLonFinder = {
                    method: 'POST',
                    body: JSON.stringify({
                        address1: address1.value,
                        city: city.value
                    }),
                    headers: {
                        'content-type': 'application/json; charset=UTF-8'
                    }
                }
                response = await fetch('../api/thirdPartyAPI', latLonFinder);
                coordinates = await response.json()
                console.log(coordinates.length)
                if (coordinates.length === 0) {
                    document.getElementById('farmAddress1').insertAdjacentHTML('afterend', 
                    '<p class="help is-danger unique">This address does not exist. Please try checking the spelling of the address or city.</p>');
                } else {
                    lat = coordinates[0].lat;
                    lon = coordinates[0].lon;
                }
            }
        } catch (e) {
            if ((address1.value !== '') && (city.value !== '') && (zip.value !== '')) {
                document.getElementById('farmAddress1').insertAdjacentHTML('afterend', 
                    '<p class="help is-danger">This address does not exist. Please try checking the spelling of the address or city fields.</p>');
            } else {
                lat = null
                lon = null
            }
        }
    
        const mapping = document.getElementsByClassName('help').length;
        if (mapping === 0) {
            console.log("SENDING...")
            // Owner data
            const ownerSettings = {
                method: 'POST',
                body: JSON.stringify({
                    fname: fName.value,
                    lname: lName.value
                }),
                headers: {
                    'content-type': 'application/json; charset=UTF-8'
                }
            };

            try {
                const fetchResponse1 = await fetch('../api/owners', ownerSettings);
                const ownerData = await fetchResponse1.json();
                ownerId = ownerData[0];
            } catch (e) {
                return e;
            }

            // Farm data
            const farmSettings = {
                method: 'POST',
                body: JSON.stringify({
                    farm_name: farm.value,
                    address1: address1.value,
                    address2: address2.value,
                    city: city.value,
                    zipcode: zip.value,
                    latitude: lat,
                    longitude: lon,
                    phone_number: phoneNumber.value,
                    email: email.value,
                    additional_info: null,
                    website: null,
                    owner_id: ownerId
                }),
                headers: {
                    'content-type': 'application/json; charset=UTF-8'
                }
            };

            try {
                const fetchResponse2 = await fetch('../api/urban_farms', farmSettings);
                const farmData = await fetchResponse2.json();
                localStorage.clear();
                localStorage.setItem('farmName', farm.value);
                // alert(localStorage.getItem('farmName'));
                window.location.href = '../inventory/index.html';
            } catch (e) {
                return e;
            }
        }
    } else {
        alert('You must agree to the terms and conditions.\nForm not submitted.');
    }
}

// Check if user agreed to the terms and conditions
function checkbox(toCheck) {
    var toReturn = false;
    if (toCheck.checked) {
        toReturn = true;
    } else {
        toReturn = false;
    }
    return toReturn;
}

submitBtn.addEventListener('click', createFarm);