/* eslint-disable no-console */
import express from 'express';
import sequelize from 'sequelize';
import chalk from 'chalk';

import db from '../database/initializeDB.js';
import products from '../controllers/products.js';
const router = express.Router();

/*farms products endpoint*/





/* products endpoint */
router.route('/products')
  .get(async(req, res) => {
    try {
      const result = await db.sequelizeDB.query(products.productGet, {
        type: sequelize.QueryTypes.SELECT
      });
      console.log('you touched the route!');
      res.json(result);
    } catch (err) {
      res.json({error: 'something went wrong!'});
    }
  })

  .post(async(req, res) => {
    try {
      const result = await db.sequelizeDB.query(products.productPost, {
        replacements: {product_name: req.body.product_name},
        type: sequelize.QueryTypes.INSERT
      });
      res.json(result);
      console.log('Successfully inserted into products')
    } catch (err) {
      res.json({error: 'something went wrong!'});
    }
  })

export default router;
