const farmProductsGet = `SELECT farm_name, product_quantity, product_scale, product_description, is_available, product_name
FROM urban_farms
JOIN farms_products USING (farm_id)
JOIN products USING (product_id);`

const oneFarmProductsGet = `SELECT farm_name, product_quantity, product_scale, product_description, is_available, product_name, product_id
FROM urban_farms
JOIN farms_products USING (farm_id)
JOIN products USING (product_id)
WHERE farm_id = :farm_id;`

const farmProductsPut = `UPDATE farms_products
SET product_quantity = :product_quantity, 
product_scale = :product_scale,
product_description = :product_description,
is_available = :is_available
WHERE farm_id = :farm_id AND product_id = :product_id;`

const farmProductsPost = `INSERT INTO farms_products(product_quantity, product_scale, product_description, is_available, farm_id, product_id)
VALUES(:product_quantity, :product_scale, :product_description, :is_available, :farm_id, :product_id);`

const farmProductsDelete = `DELETE FROM farms_products
WHERE farm_id = :farm_id AND product_id = :product_id;`

export default {
  farmProductsGet, oneFarmProductsGet, farmProductsPut, farmProductsPost, farmProductsDelete
};