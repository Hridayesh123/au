"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.login = exports.deleteSubject = exports.updateSubject = exports.createSubject = exports.getSubjectsById = exports.getSubject = void 0;
var jwt = require("jsonwebtoken");
var db_config_1 = require("../config/db_config");
var key = "key";
function login(req, res) {
    var user = {
        username: req.body.username,
        password: req.body.password,
    };
    var username = user.username, password = user.password;
    var sql = 'SELECT * FROM users WHERE firstname = $1 AND password = $2';
    var values = [user.username, user.password];
    db_config_1.default.query(sql, values, function (err, result) {
        if (err) {
            res.send("err.message");
        }
        else {
            try {
                jwt.sign({ user: user }, key, function (err, token) {
                    if (err) {
                        console.log(err.message);
                    }
                    else {
                        res.json({
                            token: token,
                        });
                    }
                });
            }
            catch (err) {
                console.log(err.message);
            }
        }
    });
}
exports.login = login;
function verifyToken(req, res, next) {
    var bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(' ');
        var token = bearer[1];
        jwt.verify(token, key, function (err, authData) {
            if (err) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            else {
                res.json({
                    message: ' authorizedddd',
                });
                next();
            }
        });
    }
    else {
        res.send({
            result: 'invalid token',
        });
    }
}
exports.verifyToken = verifyToken;
function getSubject(req, res) {
    db_config_1.default.query('SELECT * FROM subjects', function (err, result) {
        if (!err) {
            res.send(result.rows);
        }
        else {
            console.log(err.message);
        }
    });
}
exports.getSubject = getSubject;
function getSubjectsById(req, res) {
    var id = parseInt(req.params.id);
    db_config_1.default.query("SELECT * FROM subjects WHERE id=".concat(id), function (err, result) {
        if (!err) {
            res.send(result.rows);
        }
        else {
            console.log(err.message);
        }
    });
}
exports.getSubjectsById = getSubjectsById;
function createSubject(req, res) {
    var name = req.body.name;
    var code = req.body.code;
    db_config_1.default.query("INSERT INTO subjects(name, code) VALUES($1, $2)", [name, code], function (err, result) {
        if (!err) {
            res.send('successfully inserted');
        }
        else {
            console.log(err.message);
        }
    });
}
exports.createSubject = createSubject;
function updateSubject(req, res) {
    var id = parseInt(req.params.id);
    var name = req.body.name;
    var code = req.body.code;
    db_config_1.default.query("UPDATE subjects SET name = $1, code = $2 WHERE id = $3", [name, code, id], function (err, result) {
        if (!err) {
            res.send('successfully updated');
        }
        else {
            console.log(err.message);
        }
    });
}
exports.updateSubject = updateSubject;
function deleteSubject(req, res) {
    var id = parseInt(req.params.id);
    db_config_1.default.query("DELETE FROM subjects WHERE id = $1", [id], function (err, result) {
        if (!err) {
            res.send('successfully deleted');
        }
        else {
            console.log(err.message);
        }
    });
}
exports.deleteSubject = deleteSubject;
