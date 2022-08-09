Modules Required
---
ejs
express
pg
---
Also edit DB accordingly to match a user to access said database.
Here's the current PGAdmin command that isn't on one line!
---
SELECT rental_id, store.address_id, customer.first_name || ' ' || customer.last_name AS fullName, customer.email, rental_date, rental.customer_id, return_date, rental.last_update FROM rental 
JOIN customer ON rental.customer_id = customer.customer_id
WHERE return_date IS NULL
ORDER BY rental_id
