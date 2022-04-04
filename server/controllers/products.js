const productGet = `SELECT product_id, product_name
FROM products;`

const productPut = `UPDATE eruption_aoa
  SET product_name = :product_name 
  WHERE product_id = :product_id;`

const productPost = `INSERT INTO products (product_id, product_name)
VALUES(DEFAULT, :product_name);`

const productDelete = `DELETE FROM products
WHERE product_id = :product_id;`

export default {
    productGet, productPut, productPost, productDelete
};
