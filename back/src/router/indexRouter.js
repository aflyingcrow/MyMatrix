
const indexController = require("../controller/indexController")
const { jwtMiddleware } = require("../../jwtMiddleware");

exports.indexRouter = function (app) {
    // 일정 CRUD API
    app.post("/todo", jwtMiddleware, indexController.creatTodo);       // create
        // jwt적용전 read /user/1/todos   app.get("/user/:userIdx/todos", jwtMiddleware, indexController.readTodo);  
    app.get("/todos", jwtMiddleware, indexController.readTodo);  // read /user/1/todos
    app.patch("/todo", jwtMiddleware, indexController.updateTodo);     // update
        // jwt적용전 app.delete("/user/:userIdx/todo/:todoIdx", jwtMiddleware, indexController.deleteTodo);  // delete, /user/1/todo/1
    app.delete("/todo/:todoIdx", jwtMiddleware, indexController.deleteTodo);  // delete, /user/1/todo/1

    app.get(
        "/dummy",
        function (req, res, next) { 
            console.log(1);
            next(); 
        },
        function (req, res, next) { 
            console.log(2);
            next(); 
        },
            function (req, res) { 
            console.log(3); 
        }
    ); 
};