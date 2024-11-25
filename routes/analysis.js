var express = require('express');
var router = express.Router();
const db = require('../database/db')

router.post('/',async (request,response)=>{
  // Create analysis based on Start date and End Date.
  const {startDate,endDate} = request;
  // Inner Join customer and order table to perform for better performance
  const [err,result] = await db.query(`SELECT COUNT(customer_id),COUNT(order_id),
    AVG(quantity_sold * unit_price * discount/100) 
    WHERE date_of_sale BETWEEN '$1' AND '$2' `,
    [startDate,endDate]
  )
  if (err) response.status(500).json({"message":err})
  else{
    response.status(200).json({"message":result})
  }
})
module.exports = router;
