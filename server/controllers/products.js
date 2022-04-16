const productGet = `SELECT product_id, product_name
FROM products;`

const productPost = `INSERT INTO products (product_id, product_name)
VALUES(DEFAULT, :product_name);`

export default {
    productGet, productPost
};
