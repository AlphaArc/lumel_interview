var express = require('express');
var router = express.Router();
const csvHelper = require('../helper/csv_helper')

// Refresh API that calls the CSV Helper
router.get('/',async (request,response)=>{
  console.log("Inside Refresh")
  const result = await csvHelper()
  if (result) response.status(200).json({"message":"Success"})
  else{
    response.status(500).json({"message":"failure"})
  }
})

module.exports = router;
