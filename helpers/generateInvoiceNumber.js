// helpers/common.helper.js
const { Payment} = require("../models");

const generateInvoiceNumber = async () => {
    const prefix = 'NCT';
    // const randomNumber = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');

    const existingCount = await Payment.count();
    console.log('existingCount', existingCount);
    const count = existingCount + 1;
    const countString = count.toString().padStart(6, '0');
    const output = `${prefix}${countString}` 
    return output;
  };
  
  module.exports = {
    generateInvoiceNumber
  };
  