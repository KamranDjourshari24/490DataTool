const ownersPost =`INSERT INTO owner (owner_id, fname, lname, username, password)
VALUES(DEFAULT, :fname, :lname, :username, :password);`

const ownersPut = `UPDATE owner
SET fname = :fname, 
lname = :lname,
username = :username,
password = :password
WHERE owner_id = :owner_id;`

const ownersDelete = `DELETE FROM owner
WHERE owner_id = :owner_id;`


export default {
    ownersPost, ownersPut, ownersDelete
};
