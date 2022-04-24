const farmsGet = `SELECT farm_name, address1, address2, city, zipcode, latitude, longitude, phone_number, email, website, additional_info, fname, lname
FROM urban_farms
JOIN owner USING (owner_id);`

const oneFarmsGet = `SELECT farm_name, address1, address2, city, zipcode, latitude, longitude, phone_number, email, website, additional_info, fname, lname
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
additional_info = :additional_info,
owner_id = :owner_id
WHERE farm_id = :farm_id`

const farmsPost = `INSERT INTO urban_farms(farm_id, farm_name, address1, address2, city, zipcode, latitude, longitude, phone_number, email, website, additional_info, owner_id)
VALUES(DEFAULT, :farm_name, :address1, :address2, :city, :zipcode, :latitude, :longitude, :phone_number, :email, :website, :additional_info, :owner_id);`

const farmsDelete = `DELETE FROM urban_farms
WHERE farm_id = :farm_id`

export default {
    farmsGet, oneFarmsGet, farmsPut, farmsPost, farmsDelete
};