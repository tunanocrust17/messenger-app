const pool = require('./pool')

async function createUser(fName, lName, username, password) {
    const admin = true
    const values = [fName, lName, username, password, admin]
    const query = 'INSERT INTO users (fname, lname, username, password, admin) VALUES ($1, $2, $3, $4, $5)'
    await pool.query(query, values)
}

async function getGroups() {
    const query = 'SELECT * FROM groups'
    const {rows} = await pool.query(query)
    return rows
}

async function getUsersGroups(id) {
    const value = [id]
    const query = 'SELECT g.id AS group_id, g.group_name FROM groups g JOIN group_memberships gm ON g.id = gm.group_id WHERE gm.user_id = $1';
    const {rows} = await pool.query(query, value)
    return rows
}

async function getUniqueGroups(id) {
    const value = [id]
    const query = 'SELECT g.id AS group_id, g.group_name FROM groups g LEFT JOIN group_memberships gm ON g.id = gm.group_id AND gm.user_id = $1 WHERE gm.user_id IS NULL'
    const {rows} = await pool.query(query, value)
    return rows
}

async function getGroup(id) {
    const value = [id]
    const query = 'SELECT * FROM groups WHERE id = $1'
    const {rows} = await pool.query(query, value)
    return rows[0]
}

async function isMember(groupID, userID) {
    const values = [groupID, userID]
    const query = 'SELECT * FROM group_memberships WHERE group_id = $1 AND user_id = $2'
    const {rows} = await pool.query(query, values)
    return rows.length > 0
}

module.exports = {
    createUser,
    getGroups,
    getUsersGroups,
    getUniqueGroups,
    getGroup,
    isMember
}