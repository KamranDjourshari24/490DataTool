const inventoryTable = document.getElementById('inventory-body');

async function populateInventory(farmId) {

  const productsUrl = '/api/farms_products/' + farmId;
  const response = await fetch(productsUrl);
  const invData = await response.json();
  
  invData.forEach((product) => {
    const appendItem = document.createElement("tr");
    let abbrev;
    switch (product["product_scale"]) {
      case "lbs":
        abbrev = 'pounds';
        break;
      case "kg":
        abbrev = 'kilograms';
        break;
      case "n":
        abbrev = 'count';
        break;
      default:
        abbrev = 'none';
    }

    appendItem.innerHTML = `
    <td>${product["product_name"]}</td>
    <td>${product["product_quantity"]}</td>
    <td><abbr title="${abbrev}">${product["product_scale"]}</abbr></td>`;

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