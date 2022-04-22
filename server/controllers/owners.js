const ownersPost =`INSERT INTO owner (owner_id, fname, lname)
VALUES(DEFAULT, :fname, :lname);`

const ownersPut = `UPDATE owner
SET fname = :fname, 
lname = :lname
WHERE owner_id = :owner_id;`

const ownersDelete = `DELETE FROM owner
WHERE owner_id = :owner_id;`


export default {
    ownersPost, ownersPut, ownersDelete
};
