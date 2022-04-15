const farmsGet = `SELECT farm_name, address1, address2, city, zipcode, latitude, longitude, phone_number, email, website, description, fname, lname
FROM urban_farms
JOIN owner USING (owner_id);`

const farmsPut = `UPDATE urban_farms
SET farm_name = :farm_name, 
address1 = :address1, 
address2 = :address2,
city = :city, 
zipcode = :zipcode, 
latitude = :latitude, 
longitude = :longitude, 
phone_number = :phone_number, 
email = :email, 
website = :website, 
description = :description, 
fname = :fname, 
lname = :lname 
WHERE farm_id = :farm_id`

const farmsPost = `INSERT INTO urban_farms(farm_name, address1, address2, city, zipcode, latitude, longitude, phone_number, email, website, description, fname, lname)
VALUES(:farm_name, :address1, :address2, :city, :zipcode, :latitude, :longitude, :phone_number, :email, :website, :description, :fname, :lname);`

const farmsDelete = `DELETE FROM urban_farms
WHERE farm_id = :farm_id`

export default {
    farmsGet, farmsPut, farmsPost, farmsDelete
};