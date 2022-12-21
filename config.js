const dotenv = require('dotenv');
const path = require('path');


dotenv.config({
  path: path.resolve('environments', process.env.NODE_ENV + '.env')
});

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
};
