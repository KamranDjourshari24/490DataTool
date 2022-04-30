let buttonClicked = localStorage.getItem('buttonClickedGlobal')
const details = document.querySelector("#details")
const title = document.querySelector("#name")
const table = document.querySelector("#detail-products")

/* Get products data for specific farm */
async function productsData() {
  const endpoint = '../api/farms_products/' + buttonClicked;
  const request = await fetch(endpoint);
  const farmProducts = await request.json();
  return farmProducts;
}

/* Get farm data for specific farm */
async function farmData(){
  let farm = "";
  const endpoint = '../api/urban_farms';
  const request = await fetch(endpoint);
  const farms = await request.json();
  for (i=0; i<farms.length; i++){
    if (farms[i].farm_name = buttonClicked){
      farm=farms[i]
    }
  }
  return farm
}

/*Insert farm data into body of page */
async function insertData(){
  farm = await farmData()

  const titleHtml= farm.farm_name
  const bodyHtml = `<div class="block">
  <div class="title is-4">Location</div>
  <p><b>Address:</b> ${farm.address1}</p>
  <p><b>City:</b> ${farm.city}</p>
  <p><b>Zipcode:</b> ${farm.zipcode}</p>
  
</div>
<div class="block">
  <div class="title is-4">Contact Info</div>
  <p><b>Phone Number:</b> ${farm.phone_number}</p>
  <p><b>Email: </b> ${farm.email}</p>
</div>
<div class="block">
  <div class="title is-4" >Additional Information</div>
  <p>${farm.additional_info}
  </p>
</div>
</div>`
title.innerHTML = titleHtml;
details.innerHTML = bodyHtml;
}




