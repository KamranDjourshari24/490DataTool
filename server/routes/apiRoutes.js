/* eslint-disable no-console */
import express from 'express';
import sequelize from 'sequelize';
import chalk from 'chalk';

import db from '../database/initializeDB.js';
import products from '../controllers/products.js';
import farmProducts from '../controllers/farmproducts.js'
const router = express.Router();

/*farms products endpoint*/
router.route('/farms_products')
  .get(async(req, res) => {
    try {
      const result = await db.sequelizeDB.query(farmProducts.farmProductsGet, {
        type: sequelize.QueryTypes.SELECT
      });
      console.log('you touched the route!');
      res.json(result);
    } catch (err) {
      res.json({error: 'something went wrong!'});
    }
  })

  .put(async(req, res) => {
    try {
      const result = await db.sequelizeDB.query(farmProducts.farmProductsPut, {
        replacements: {
          product_quantity: req.body.product_quantity,
          product_scale: req.body.product_scale,
          farm_id: req.body.farm_id,
          product_id: req.body.product_id,
        },
        type: sequelize.QueryTypes.UPDATE
      });
      res.json(result);
      console.log('Successfully updated farm_products')
    } catch (err) {
      res.json({error: 'something went wrong!'});
    }
  })

  .post(async(req, res) => {
    try {
      const result = await db.sequelizeDB.query(farmProducts.farmProductsPost, {
        replacements: {
          product_quantity: req.body.product_quantity,
          product_scale: req.body.product_scale,
          farm_id: req.body.farm_id,
          product_id: req.body.product_id,
        },
        type: sequelize.QueryTypes.INSERT
      });
      console.log('Successfully inserted farm_products')
      res.json(result);
    } catch (err) {
      res.json({error: 'something went wrong!'});
    }
  })

  .delete(async(req, res) => {
    try {
      const result = await db.sequelizeDB.query(farmProducts.farmProductsPost, {
        replacements: {
          farm_id: req.body.farm_id,
          product_id: req.body.product_id,
        },
        type: sequelize.QueryTypes.DELETE
      });
      console.log('Successfully deleted from farm_products')
      res.json(result);
    } catch (err) {
      res.json({error: 'something went wrong!'});
    }
  });



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
