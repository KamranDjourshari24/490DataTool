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





