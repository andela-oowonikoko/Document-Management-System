import dotenv from 'dotenv';

dotenv.config();

module.exports = {
  development: {
    username: process.env.DBUSERNAME,
    password: process.env.DBPASSWORD,
    database: process.env.DBDEVELOPMENT,
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres'
  },
  test: {
    username: process.env.DBUSERNAME,
    password: process.env.DBPASSWORD,
    database: process.env.DBTEST,
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres'
  },
  production: {
    username: process.env.DBUSERNAME,
    password: process.env.DBPASSWORD,
    database: process.env.DBPRODUCTION,
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres'
  }
};

