const accessToken = 'pk.eyJ1Ijoia2Rqb3Vyc2hhcmkiLCJhIjoiY2wxeWpuMHRyMGRkeTNicWZsaGJqc2FrMCJ9.V8fX1KUAHlH-3jIUjj-V4g';
const mymap = L.map('mapid').setView([38.7849, -76.8721], 9);
L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${accessToken}`, {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: 'pk.eyJ1Ijoia2Rqb3Vyc2hhcmkiLCJhIjoiY2wxeWpuMHRyMGRkeTNicWZsaGJqc2FrMCJ9.V8fX1KUAHlH-3jIUjj-V4g'
}).addTo(mymap);
const markerGroup = L.layerGroup().addTo(mymap);



async function dataReturn() {
  const endpoint = '../api/urban_farms';
  const request = await fetch(endpoint);
  const farms = await request.json();
  return farms
}

const form = document.querySelector("#form");
const farm_name = document.querySelector("#name");
const city = document.querySelector("#city");
const zip = document.querySelector("#zip");
const results = document.querySelector("#results");

function validateURL(link) {
    if (link.indexOf("http://www.") == 0 || link.indexOf("https://www.") == 0) {
        return link
    } else if (link.indexOf("www.") == 0){
        const new_link = "https://" + link
        return new_link
    } else {
        const new_link = "https://www." + link
        return new_link
    }
}

function displayMatches(farmList) {
  if (farmList.length === 0) {
    results.innerHTML = '<h1 class="box no-result">No Results Avaliable</h1>';
    markerGroup.clearLayers();
  } else {
    markerGroup.clearLayers();
    const html = farmList.map((place) => {
      const points = [place.latitude, place.longitude];
      singleMarker = L.marker(points).addTo(markerGroup);
      singleMarker.bindPopup(place.farm_name);
      return `
              <li class="box result">
                <div class="content">
                                          <!-- Static photo -->
                  <img class="farm-image" src="../images/download.jpg" alt="A Test Farm Image">
                  <div class="farm-info">
                    <h1 class="farm-name">${place.farm_name}</h1>
                    <br/>
                    <strong>Website:</strong><a href="http://www.huckbfarm.com" class="farm-row"> ${place.website}</a>
                    <br/>
                    <strong>Address:</strong><span class="farm-row"> ${place.address1}, ${place.city}</span>
                    <br/>
                    <strong>Zip Code:</strong><span class="farm-row"> ${place.zip}</span>
                    <br/>
                  </div>
                </div>
              </li>      
          `;
    }).join('');
    const firstLoc = [farmList[0].latitude,farmList[0].longitude];
    mymap.flyTo(firstLoc, 12.5);
    results.innerHTML = html;
  }
}

form.addEventListener("submit", async (submitEvent) => {
  submitEvent.preventDefault();
  let farms;
  farms = await dataReturn();
  if ((farm_name.value)&&(farms.length > 0)){
    farms = farms.filter(
      (item) =>
      item.farm_name.toLowerCase().includes(farm_name.value.toLowerCase())
    )
  }
  if ((city.value)&&(farms.length > 0)){
    farms = farms.filter(
      (item) =>
      item.city.toLowerCase().includes(city.value.toLowerCase())
    )
  }
  if ((zip.value)&&(farms.length > 0)){
    farms = farms.filter(
      (item) =>
      item.zipcode.includes(zip.value)
    )
  }
  displayMatches(farms)
})

dataReturn()