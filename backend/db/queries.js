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

async function isAdmin(groupID, userID) {
    const values = [groupID, userID]
    const query = 'SELECT * FROM group_admins WHERE group_id = $1 AND user_id = $2'
    const {rows} = await pool.query(query, values)
    return rows.length > 0
}

async function getGroupAnswer(groupID) {
    const value = [groupID]
    const query = 'SELECT group_answer FROM groups WHERE id = $1'
    const {rows} = await pool.query(query, value)
    return rows[0]
}

async function addUserToGroup(groupID, userID) {
    const values = [groupID, userID]
    const query = 'INSERT INTO group_memberships (group_id, user_id) VALUES ($1, $2)'
    await pool.query(query, values)
}

async function postMessage(groupID, userID, message) {
    const values = [groupID, userID, message]
    const query = 'INSERT INTO messages (group_id, user_id, content) VALUES ($1, $2, $3)'
    await pool.query(query, values)
}

async function getGroupsMessages(groupID) {
    const value = [groupID]
    const query = 'SELECT m.id, m.user_id, m.content, m.created_at, u.username FROM messages m JOIN users u ON m.user_id = u.id WHERE m.group_id = $1 ORDER BY m.created_at DESC'
    const {rows} = await pool.query(query, value)
    return rows
}

module.exports = {
    createUser,
    getGroups,
    getUsersGroups,
    getUniqueGroups,
    getGroup,
    getGroupAnswer,
    isMember,
    isAdmin,
    addUserToGroup,
    postMessage,
    getGroupsMessages
}