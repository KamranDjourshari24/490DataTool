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

async function createFarm(e) {
    e.preventDefault();

    if (checkbox(cb) == true) {
        const settings = {
            method: 'POST',
            body: JSON.stringify({
                farm_name: farm.value,
                address1: address1.value,
                address2: address2.value,
                city: city.value,
                zipcode: zip.value,
                latitude: null,
                longitude: null,
                phone_number: phoneNumber.value,
                email: email.value,
                additional_info: null,
                website: null,
            }),
            headers: {
                'content-type': 'application/json; charset=UTF-8'
            }
        };
        //alert('Form submitted');
        try {
            const fetchResponse = await fetch('../api/urban_farms', settings);
            if (fetchResponse.ok) {
                console.log('Response OK');
            }
            const data = await fetchResponse.json();
            return data;
        } catch (e) {
            return e;
        }
    } else {
        alert('You must agree to the terms and conditions.\nForm not submitted.');
    }
}

/*await fetch('../api/urban_farms', {
    method: 'POST',
    body: JSON.stringify({
        farm_name: farm.value,
        address1: address1.value,
        address2: address2.value,
        city: city.value,
        zipcode: zip.value,
        latitude: null,
        longitude: null,
        phone_number: phoneNumber.value,
        email: email.value,
        additional_info: null,
        website: null,
    }),
    headers: {
        'content-type': 'application/json; charset=UTF-8'
    }
});*/

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