const { pool } = require("../../database");

exports.getUserRows = async function () {
    try {
        const connection = await pool.getConnection(async (conn) => conn);

        try {
            const selectUserQurey = 'SELECT * FROM Users;';

            const [row] = await connection.query(selectUserQurey);
            connection.release();
            return row;
        } catch (err) {
            console.error(` ##### getUserRows Query error #####`);
            connection.release();
            return false;
        }

    } catch (err) {
        console.error(` ##### getUserRows DB error #####`);
        return false;
    }
};

exports.insertTodo = async function (userIdx, contents, type) {    
    try {
        // DB 연결 검사
        const connection = await pool.getConnection(async (conn) => conn);

        try {
            // 퀴리
            const insertTodoQurey = 
               "insert into Todos (userIdx, contents, type) values (?, ?, ?);";
            const insertTodoParams = [userIdx, contents, type];


            const [row] = await connection.query(insertTodoQurey, insertTodoParams);
            connection.release();
            return row;
        } catch (err) {
            console.error(` ##### getUserRows Query error ##### \n ${err}`);
            connection.release();
            return false;
        }

    } catch (err) {
        console.error(` ##### getUserRows DB error ##### \n ${err}`);
        return false;
    }
};

exports.selectTodoByType = async function (userIdx, type) {
    try {
        // DB 연결 검사
        const connection = await pool.getConnection(async (conn) => conn);

        try {
            // 퀴리
            const selectTodoByTypeQurey = 
               "select todoIdx, contents, status from Todos where userIdx = ? and type = ? and not(status = 'D');";
            const selectTodoByTypeParams = [userIdx, type];


            const [row] = await connection.query(
                selectTodoByTypeQurey, 
                selectTodoByTypeParams
            );
            connection.release();
            return row;
        } catch (err) {
            console.error(` ##### selectTodoByType Query error ##### \n ${err}`);
            connection.release();
            return false;
        }

    } catch (err) {
        console.error(` ##### selectTodoByType DB error ##### \n ${err}`);
        return false;
    }

};

exports.selectValidTodo = async function (userIdx, todoIdx) {
    try {
        // DB 연결 검사
        const connection = await pool.getConnection(async (conn) => conn);

        try {
            // 퀴리
            const selectValidTodoQurey = 
               "select * from Todos where userIdx = ? and todoIdx = ? and not(status = 'D');";
            const selectValidTodoParams = [userIdx, todoIdx];


            const [row] = await connection.query(
                selectValidTodoQurey, 
                selectValidTodoParams
            );
            connection.release();
            return row;
        } catch (err) {
            console.error(` ##### selectValidTodo Query error ##### \n ${err}`);
            connection.release();
            return false;
        }

    } catch (err) {
        console.error(` ##### selectValidTodo DB error ##### \n ${err}`);
        return false;
    }
};

exports.updateTodo = async function(userIdx, todoIdx, contents, status) {
    try {
        // DB 연결 검사
        const connection = await pool.getConnection(async (conn) => conn);

        try {
            // 퀴리
            const updateTodoQurey = 
               "update Todos set contents = ifnull(?, contents), status = ifnull(?, status) where userIdx = ? and todoIdx = ?;";
            const updateTodoParams = [contents, status, userIdx, todoIdx];    // ? 출현 순에 따라 파라미터 순서 맞출것!!


            const [row] = await connection.query(
                updateTodoQurey, 
                updateTodoParams
            );
            connection.release();
            return row;
        } catch (err) {
            console.error(` ##### updateTodo Query error ##### \n ${err}`);
            connection.release();
            return false;
        }

    } catch (err) {
        console.error(` ##### updateTodo DB error ##### \n ${err}`);
        return false;
    }
};

exports.deleteTodo =  async function (userIdx, todoIdx) {
    try {
        // DB 연결 검사
        const connection = await pool.getConnection(async (conn) => conn);

        try {
            // 퀴리
            const deleteTodoQurey = 
               "update Todos set status = 'D' where useridx = ? and todoIdx = ?;";
            const deleteTodoParams = [userIdx, todoIdx];    


            const [row] = await connection.query(
                deleteTodoQurey, 
                deleteTodoParams
            );
            connection.release();
            return row;
        } catch (err) {
            console.error(` ##### deleteTodo Query error ##### \n ${err}`);
            connection.release();
            return false;
        }

    } catch (err) {
        console.error(` ##### deleteTodo DB error ##### \n ${err}`);
        return false;
    }
};