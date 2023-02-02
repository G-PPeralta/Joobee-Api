const express = require('express');
const app = express();

// Setting up config.env file variables

const dotenv = require('dotenv');

dotenv.config({ path: '../config.env' });


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});