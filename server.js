/* eslint-disable no-console */
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import apiRoutes from './server/routes/apiRoutes.js';
import loginRoutes from './server/routes/loginRoutes.js';
import reload from 'livereload';
import connectReload from 'connect-livereload';
import path from 'path';

const __dirname = path.resolve();
// import db from './server/database/initializeDB.js';

const app = express();
const PORT = process.env.PORT || 3000;
const staticFolder = 'client';
let liveReloadServer;

// Add some auto-reloading to our server
if (process.env.CONTEXT === 'development') {
  liveReloadServer = reload.createServer();
  liveReloadServer.watch(path.join(__dirname, staticFolder));
}

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(staticFolder));
// app.use('/template', labRoutes);
app.use('/api', apiRoutes);
app.use('/user', loginRoutes);

async function bootServer() {
  try {
    app.listen(PORT, () => {
      // Turn these back on in later labs
      // const mysql = await db.sequelizeDB;
      // await mysql.sync();
      console.log(`Listening on: http://localhost:${PORT}`);
      console.log(`environment:`, process.env.CONTEXT);
    });
  } catch (err) {
    console.error(err);
  }
}

bootServer();
if (process.env.CONTEXT === 'development') {
  liveReloadServer.server.once('connection', () => {
    setTimeout(() => {
      liveReloadServer.refresh('/');
    }, 100);
  });
}
