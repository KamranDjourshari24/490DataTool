/* eslint-disable no-console */
import express from 'express';
import sequelize from 'sequelize';
import chalk from 'chalk';

import db from '../database/initializeDB.js';
import products from '../controllers/products.js';
const router = express.Router();
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

export default router;
