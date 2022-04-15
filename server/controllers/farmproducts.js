const farmProductsGet = `SELECT farm_name, product_quantity, product_scale, product_name
FROM \`urban farms\`
JOIN \`farms products\` USING (farm_id)
JOIN \`products\` USING (product_id);`

const farmProductsPut = `UPDATE \`farms products\`
SET product_quantity = :product_quantity, 
product_scale = :product_scale, 
WHERE farm_id = :farm_id AND product_id = :product_id;`

const farmProductsPost = `INSERT INTO \`farms products\`(product_quantity, product_scale, farm_id, product_id)
VALUES(:product_quantity, :product_scale, :farm_id, :product_id);`

const farmProductsDelete = `DELETE FROM \`farms products\`
WHERE farm_id = :farm_id AND product_id = :product_id;`

export default {
  farmProductsGet, farmProductsPut, farmProductsPost, farmProductsDelete
};