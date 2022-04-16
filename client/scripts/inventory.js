const inventoryTable = document.getElementById('inventory-body');

async function populateInventory(farmId) {

  const productsUrl = '/api/farms_products/' + farmId;
  const response = await fetch(productsUrl);
  const invData = await response.json();
  console.log(invData);
  invData.forEach((product) => {
    const appendItem = document.createElement("tr");
    
    appendItem.innerHTML = `
    <th>${product["product_name"]}</th>
    <td>${product["product_quantity"]}</td>
    <td>${product["product_scale"]}</td>`;

    inventoryTable.append(appendItem);
  })
}


// async function dataHandler() {
//   populateInventory('2');
// }



async function windowActions() {
  populateInventory('2');
}

window.onload = windowActions;