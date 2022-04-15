async function mapHandler() {

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
}



window.onload = mapHandler;