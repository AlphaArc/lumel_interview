const fs = require('fs');
const csvParser = require('csv-parser')
const db = require("../database/db")


const filepath = './sample.csv'
async function csvHelper() {
    const rows = []
    // Created rows variable to push incoming values
    return new Promise((resolve,reject)=>{
        fs.createReadStream(filepath)
            .pipe(csvParser())
            .on('data', (row) => {
                console.log('A row arrived: ', row);
                rows.push(row)
            })
            .on('end', async () => {
                console.log('No more rows!');
                try{
                    for ( let row of rows ){
                        await db.query(`INSERT INTO company.orders(
                            order_id,
                            product_id,
                            customer_id,
                            product_name,
                            catagory,
                            region,
                            date_of_sale,
                            quantity_sold,
                            unit_price,
                            discount,
                            shipping_cost,
                            payment_method,
                            customer_name,
                            customer_email,
                            customer_address
                            ) VALUES ($1,$2,$3,$4,$5,$6,$7,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)`,
                            [
                            row["Order ID"],
                            row["Product ID"],
                            row["Customer ID"],
                            row["Product Name"],
                            row["Category"],
                            row["Region"],
                            row["Date of Sale"],
                            row["Quantity Sold"],
                            row["Unit Price"],
                            row["Discount"],
                            row["Shipping Cost"],
                            row["Payment Method"],
                            row["Customer Name"],
                            row["Customer Email"],
                            row["Customer Address"]
                        ])
                    }
                    resolve("Data Loaded Successfully");
                }catch(error){
                    reject(error);
                }
            });

    })

    
} 

// Upload onto db when no more rows are coming.
/* Best SQL practice are
    - Create seperate customer table, product table and orders table to reduce redundancy
    - Create indexes for product_id, order_id and customer_id to increase query speed
*/

module.exports = csvHelper