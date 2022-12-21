const { pool } = require("../../database");

exports.insertUser = async function (email, password, nickname) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        
        try {
            const insertUserQurey = 
                "insert into Users (email, password, nickname) values (?, ?, ?);";
            const insertUserParams = [email, password, nickname];

            const [row] = await connection.query(
                insertUserQurey, 
                insertUserParams);
            connection.release();
            return row;
        } catch (err) {
            console.error(` ##### insertUser Query error #####`);
            connection.release();
            return false;
        }

    } catch (err) {
        console.error(` ##### insertUser DB error #####`);
        return false;
    }
};

exports.selectUserByEmail = async function (email) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        
        try {
            const selectUserByEmailQurey = 
                "select * from Users where email = ?;";
            const selectUserByEmailParams = [email];

            const [row] = await connection.query(
                selectUserByEmailQurey, 
                selectUserByEmailParams);
            connection.release();
            return row;
        } catch (err) {
            console.error(` ##### selectUserByEmail Query error #####`);
            connection.release();
            return false;
        }

    } catch (err) {
        console.error(` ##### selectUserByEmail DB error #####`);
        return false;
    }
};

exports.selectUser = async function (email, password) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        
        try {
            const selectUserQurey = 
                "select * from Users where email = ? and password = ?;";
            const selectUserParams = [email, password];

            const [row] = await connection.query(
                selectUserQurey, 
                selectUserParams);
            connection.release();
            return row;
        } catch (err) {
            console.error(` ##### selectUser Query error #####`);
            connection.release();
            return false;
        }

    } catch (err) {
        console.error(` ##### selectUser DB error #####`);
        return false;
    }
};

exports.selectNicknmeByUserIdx = async function (userIdx) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        
        try {
            const selectNicknmeByUserIdxQurey = 
                "select * from Users where userIdx = ?;";
            const selectNicknmeByUserIdxParams = [userIdx];

            const [row] = await connection.query(
                selectNicknmeByUserIdxQurey, 
                selectNicknmeByUserIdxParams);
            connection.release();
            return row;
        } catch (err) {
            console.error(` ##### selectNicknmeByUserIdx Query error #####`);
            connection.release();
            return false;
        }

    } catch (err) {
        console.error(` ##### selectNicknmeByUserIdx DB error #####`);
        return false;
    }
};