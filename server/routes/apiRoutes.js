/* eslint-disable no-console */
import express from 'express';
import sequelize from 'sequelize';
import chalk from 'chalk';

import db from '../database/initializeDB.js';
import products from '../controllers/products.js';
import farmProducts from '../controllers/farmproducts.js';
import farms from '../controllers/farms.js';
const router = express.Router();

/*farms endpoint*/
router.route('/urban_farms')
  .get(async(req, res) => {
    try {
      const result = await db.sequelizeDB.query(farms.farmsGet, {
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
      const result = await db.sequelizeDB.query(farms.farmsPut, {
        replacements: {
          farm_name: req.body.farm_name, 
          address1: req.body.address1, 
          address2: req.body.address2,
          city: req.body.city, 
          zipcode: req.body.zipcode, 
          latitude: req.body.latitude, 
          longitude: req.body.longitude, 
          phone_number: req.body.phone_number, 
          email: req.body.email, 
          website: req.body.website, 
          description: req.body.description, 
          fname: req.body.fname, 
          lname: req.body.lname,
          farm_id: req.body.farm_id,
        },
        type: sequelize.QueryTypes.UPDATE
      });
      res.json(result);
      console.log('Successfully updated urban_farms')
    } catch (err) {
      res.json({error: 'something went wrong!'});
    }
  })

  .post(async(req, res) => {
    try {
      const result = await db.sequelizeDB.query(farms.farmsPost, {
        replacements: {
          farm_name: req.body.farm_name, 
          address1: req.body.address1, 
          address2: req.body.address2,
          city: req.body.city, 
          zipcode: req.body.zipcode, 
          latitude: req.body.latitude, 
          longitude: req.body.longitude, 
          phone_number: req.body.phone_number, 
          email: req.body.email, 
          website: req.body.website, 
          description: req.body.description, 
          fname: req.body.fname, 
          lname: req.body.lname,
        },
        type: sequelize.QueryTypes.INSERT
      });
      console.log('Successfully inserted into urban_farms')
      res.json(result);
    } catch (err) {
      res.json({error: 'something went wrong!'});
    }
  })

  .delete(async(req, res) => {
    try {
      const result = await db.sequelizeDB.query(farms.farmsDelete, {
        replacements: {
          farm_id: req.body.farm_id,
        },
        type: sequelize.QueryTypes.DELETE
      });
      console.log('Successfully deleted from urban_farms')
      res.json(result);
    } catch (err) {
      res.json({error: 'something went wrong!'});
    }
  });


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
