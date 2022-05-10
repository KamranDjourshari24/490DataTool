import express from 'express';
import sequelize from 'sequelize';
import path from 'path';
import chalk from 'chalk';
import fetch from 'node-fetch';
import db from '../database/initializeDB.js';
import login from '../controllers/login.js';
const router = express.Router();

let session;
// NO SAFE PASSWORD HANDLING HAS BEEN ATTEMPTED. DO NOT DEPLOY THIS IN ITS CURRENT FORM!!!!!!!
router.route('/authenticate')
  .post(async (req, res) => {
    try{
      const credentials = await db.sequelizeDB.query(login.getCreds, {
        type: sequelize.QueryTypes.SELECT,
        replacements: { username: req.body.username }
      });

      
  
      const username = credentials[0]['username'];
      const password = credentials[0]['password'];
      if (req.body.username == username && req.body.password == password) {
        const farmNameQuery = `SELECT farm_name
        FROM urban_farms
        JOIN owner USING (owner_id)
        WHERE owner_id = ${credentials[0]['owner_id']}`;
        const farmNames = await db.sequelizeDB.query(farmNameQuery, {
          type: sequelize.QueryTypes.SELECT
          // replacements: {owner_id: credentials[0]['owner_id']}
        });
        res.send(`<html><body><p>login successful</p><script>sessionStorage.setItem('farmName', "${farmNames[0]['farm_name']}"); window.location.href = '../profile/index.html';</script></body></html>`);
        // res.redirect('../profile/');
      } else {
        res.send('incorrect username or password');
      }
    } catch (err) {
      console.log(err);
      res.send('Something went wrong!');
    }
    
  });

router.route('/logout')
  .get(async (req, res) => {
    
    try {
      res.send(`<html><body><script>sessionStorage.removeItem('farmName'); window.location.href = '../index.html';</script></body></html>`);
      // res.redirect('../');
    } catch (err) {
      console.log(err);
      res.send('unable to logout');
    }
    
  });


export default router;