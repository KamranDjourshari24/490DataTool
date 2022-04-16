const inventoryTable = document.getElementById('inventory-body');

async function populateInventory(farmId) {

  const productsUrl = '/api/farms_products/' + farmId;
  const response = await fetch(productsUrl);
  const invData = await response.json();
  
  invData.forEach((product) => {
    const appendItem = document.createElement("tr");
    
    appendItem.innerHTML = `
    <th>${product["product_name"]}</th>
    <td>${product["product_quantity"]}</td>
    <td>${product["product_scale"]}</td>`;

    inventoryTable.append(appendItem);
  })
}


async function dataHandler() {
  await populateInventory('2');
}



async function windowActions() {
  await dataHandler();
}

window.onload = windowActions;