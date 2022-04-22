const form = document.querySelector("#form");


if(document.getElementById('term').checked) {
    // Respond to the result
    alert("Checkbox checked!");
}


// Attach event handler to form
form.addEventListener('submit', (e) => {
    // send `POST` request
    fetch('../api/urban_farms', {
        method: 'POST',
        body: JSON.stringify({
            farm_name: farm_name ,
            address1: address1, 
            address2: address2,
            city: city, 
            zipcode: zipcode, 
            latitude: latitude, 
            longitude: longitude, 
            phone_number: phone_num, 
            email: email, 
            website: website, 
            additional_info: additional_info,
            owner_id: owner_id, 
        })
    }).then(res => res.json())
        .then(json => console.log(json))
        .catch(err => console.error(err));
});