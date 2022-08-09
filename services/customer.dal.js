const dal = require("./db");
//get all customers.
var getInfo = function() {
  return new Promise(function(resolve, reject) {
    const sql = `SELECT rental_id, customer.first_name || ' ' || customer.last_name AS fullName, customer.email, rental_date, rental.customer_id, return_date, rental.last_update FROM rental JOIN customer ON rental.customer_id = customer.customer_id WHERE return_date IS NULL ORDER BY rental_id`;
    dal.query(sql, [], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.rows);
      }
    }); 
  }); 
}

module.exports = {
    getInfo
};