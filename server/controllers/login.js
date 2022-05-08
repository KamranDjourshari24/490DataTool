const getCreds = `SELECT owner_id, username, password
FROM owner
WHERE username = :username`;

export default{
    getCreds
}