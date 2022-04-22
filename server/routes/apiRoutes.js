/* eslint-disable no-console */
import express from 'express';
import sequelize from 'sequelize';
import chalk from 'chalk';

import db from '../database/initializeDB.js';
import products from '../controllers/products.js';
import farmProducts from '../controllers/farmproducts.js';
import farms from '../controllers/farms.js';
import owners from '../controllers/owners.js';
const router = express.Router();

function getOwnerIdByName(object, fname, lname) {
  return object.filter((item) => (item.fname === fname)&&(item.lname === lname));
}

function getRowByFarm(object, farmname) {
  return object.filter((item) => (item.farm_name === farmname))
}

function getRowByProduct(object, productname) {
  return object.filter((item) => (item.product_name === productname))
}

function getTableRows(table) {
  return `SELECT * FROM ${table}`;
}

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

  /*Does not work for some reason*/
  .put(async(req, res) => { 
    try {
      let ownerId;
      let farmRow;
      // getting owner ID by name
      const owners = await db.sequelizeDB.query(getTableRows('owner'), {
        type: sequelize.QueryTypes.SELECT
      });
      let owner = getOwnerIdByName(owners, req.body.fname, req.body.lname)
      ownerId = owner.map((ownername) => ownername.owner_id)[0];


      const farmInfo = await db.sequelizeDB.query(getTableRows('urban_farms'), {
        type: sequelize.QueryTypes.SELECT
      });
      farmRow = getRowByFarm(farmInfo, req.body.farm_name)
      const farmId = farmRow.map((farm) => farm.farm_id)[0];

      // get owner ID by farm name instead if owner ID is null
      if (!ownerId) {
        ownerId = farmRow.map((ownername) => ownername.owner_id)[0];
      }
      
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
          additional_info: req.body.additional_info, 
          farm_id: farmId,
          owner_id: ownerId
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
          additional_info: req.body.additional_info,
          owner_id: req.body.owner_id, 
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
          product_description: req.body.product_description,
          is_available: req.body.is_available,
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

    /*Does not work for some reason*/ 
    // I think it is working now, might have been just typo in the request
  .delete(async(req, res) => {
    try {
      // Mapping farm name to ID (assuming we just take the farm name and get the ID on the backend)
      const farmsTable = await db.sequelizeDB.query(getTableRows('urban_farms'), {
        type: sequelize.QueryTypes.SELECT
      });
      const farmRow = getRowByFarm(farmsTable, req.body.farm_name);
      const farmId = farmRow.map((farm) => farm.farm_id)[0];

      // Mapping product name to ID
      const productsTable = await db.sequelizeDB.query(getTableRows('products'), {
        type: sequelize.QueryTypes.SELECT
      });
      const productRow = getRowByProduct(productsTable, req.body.product_name);
      const productId = productRow.map((product) => product.product_id)[0];

      const result = await db.sequelizeDB.query(farmProducts.farmProductsDelete, {
        replacements: {
          farm_id: farmId,
          product_id: productId,
        },
        type: sequelize.QueryTypes.DELETE
      });
      console.log('Successfully deleted from farm_products')
      res.json(result);
    } catch (err) {
      res.json({error: 'something went wrong!'});
    }
  });

/* Inidividual farm products endpoint */
router.route('/farms_products/:farm_name')
  .get(async(req, res) => {
    try {
      // // Mapping farm name to ID (assuming we just take the farm name and get the ID on the backend)
      const farmName = req.params.farm_name.replace('_', ' ');
      const farmInfo = await db.sequelizeDB.query(getTableRows('urban_farms'), {
        type: sequelize.QueryTypes.SELECT
      });
      // console.log(farmName);
      const farmRow = getRowByFarm(farmInfo, farmName);
      const farmId = farmRow.map((farm) => farm.farm_id)[0];
      // console.log(farmRow);
      const result = await db.sequelizeDB.query(farmProducts.oneFarmProductsGet, {
        replacements: {
          farm_id: farmId
        },
        type: sequelize.QueryTypes.SELECT
      });
      res.json(result);
      console.log("you touched the route!");
    } catch (err) {
      res.json({error: 'something went wrong!'});
    }
  })

  .post(async(req, res) => {
    res.json({error: 'Route not available'});
  })
  .put(async(req, res) => {
    try {
      const farmName = req.params.farm_name.replace('_', ' ');

      const farmInfo = await db.sequelizeDB.query(getTableRows('urban_farms'), {
        type: sequelize.QueryTypes.SELECT
      });
  
      const farmRow = getRowByFarm(farmInfo, farmName);
      const farmId = farmRow.map((farm) => farm.farm_id)[0];
      
      const prodInfo = await db.sequelizeDB.query(getTableRows('products'), {
        type: sequelize.QueryTypes.SELECT
      });

      const prodRow = getRowByProduct(prodInfo, req.body.product_name);
      const prodId = prodRow.map((product) => product.product_id)[0];
      console.log(farmId);
      console.log(prodId);

      const result = await db.sequelizeDB.query(farmProducts.farmProductsPut, {
        replacements: {
          farm_id: farmId,
          product_id: prodId,
          product_description: req.body.product_description,
          is_available: req.body.is_available,
          product_name: req.body.product_name,
          product_quantity: req.body.product_quantity,
          product_scale: req.body.product_scale
        },
        type: sequelize.QueryTypes.UPDATE
      });
      // console.log(result);
      console.log("you touched the route!");
      res.send({message:'Update successful'});
      
    } catch(err) {
      console.error(err);
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
  });

  /* owners endpoint */
router.route('/owners')

.post(async(req, res) => {
  try {
    const result = await db.sequelizeDB.query(owners.ownersPost, {
      replacements: {
        fname: req.body.fname,
        lname: req.body.lname,
      },
      type: sequelize.QueryTypes.INSERT
    });
    res.json(result);
    console.log('Successfully inserted into owners')
  } catch (err) {
    res.json({error: 'something went wrong!'});
  }
})

.put(async(req, res) => {
  try {
    const result = await db.sequelizeDB.query(owners.ownersPut, {
      replacements: {
        owner_id: req.body.owner_id,
        fname: req.body.fname,
        lname: req.body.lname,
      },
      type: sequelize.QueryTypes.UPDATE
    });
    res.json(result);
    console.log('Successfully updated owners')
  } catch (err) {
    res.json({error: 'something went wrong!'});
  }
})

.delete(async(req, res) => {
    try {
      const result = await db.sequelizeDB.query(owners.ownersDelete, {
        replacements: {
          owner_id: req.body.owner_id
        },
        type: sequelize.QueryTypes.DELETE
      });
      console.log('Successfully deleted from owners')
      res.json(result);
    } catch (err) {
      res.json({error: 'something went wrong!'});
    }
  });

export default router;
