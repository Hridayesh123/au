"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = exports.verifyToken = exports.login = exports.deleteSubject = exports.updateSubject = exports.createSubject = exports.getSubjectsById = exports.getSubject = void 0;
const jwt = require("jsonwebtoken");
const db_config_1 = require("../config/db_config");
let key = '';
let key_from_db = '';
function login(req, res) {
    const user = {
        firstname: req.body.firstname,
        password: req.body.password,
        key: req.body.key,
    };
    const { firstname, password } = user;
    const sql = 'SELECT * FROM users WHERE firstname = $1 AND password = $2 AND secret_key =$3';
    const values = [user.firstname, user.password, user.key];
    db_config_1.default.query(sql, values, (err, result) => {
        if (!err && result.rows.length !== 0) {
            const key = result.rows[0].secret_key;
            console.log(key);
            try {
                jwt.sign({ user }, key, (err, token) => {
                    if (err) {
                        console.log(err.message);
                    }
                    else {
                        res.json({
                            token,
                        });
                    }
                });
                res.locals.key = key;
            }
            catch (err) {
                console.log(err.message);
            }
        }
        else {
            res.send("user not validated");
            console.log(err.message);
        }
    });
}
exports.login = login;
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    console.log(bearerHeader);
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const token = bearer[1];
        // const token_ins_query=`INSERT INTO login (token)
        //             VALUES (${token})`;
        // DbClient.query(token_ins_query, (err,result) => {
        //   if (err) {
        //     res.status(401).json({ message: 'token not inserted', error: err });
        //   }
        // })
        console.log(res.locals.key);
        jwt.verify(token, res.locals.key, (err, authData) => {
            if (err) {
                console.log(err);
                return res.status(401).json({ message: 'Unauthorized' });
            }
            else {
                console.log(authData.user.firstname);
                const sqll = `SELECT * FROM users where firstname=$1`;
                const values = [authData.user.firstname];
                db_config_1.default.query(sqll, values, (err, result) => {
                    if (err) {
                        res.status(401).json({ message: 'not verified', error: err });
                    }
                    else {
                        res.locals.user = result.rows[0];
                        next();
                    }
                });
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
function getProfile(req, res) {
    const user_id = res.locals.user.id;
    // console.log('Profile: ', res.locals.user);
    // res.end();
}
exports.getProfile = getProfile;
function getSubject(req, res) {
    db_config_1.default.query('SELECT * FROM subjects', (err, result) => {
        if (err) {
            console.log(err.message);
            res.send({ error: err });
        }
        else {
            res.send(result.rows);
        }
    });
}
exports.getSubject = getSubject;
function getSubjectsById(req, res) {
    const id = parseInt(req.params.id);
    db_config_1.default.query(`SELECT * FROM subjects WHERE id=${id}`, (err, result) => {
        if (err) {
            console.log(err.message);
        }
        else {
            res.send(result.rows);
        }
    });
}
exports.getSubjectsById = getSubjectsById;
function createSubject(req, res) {
    const name = req.body.name;
    const code = req.body.code;
    db_config_1.default.query(`INSERT INTO subjects(name, code) VALUES($1, $2)`, [name, code], (err, result) => {
        if (err) {
            console.log(err.message);
        }
        else {
            res.send('successfully inserted');
        }
    });
}
exports.createSubject = createSubject;
function updateSubject(req, res) {
    const id = parseInt(req.params.id);
    const name = req.body.name;
    const code = req.body.code;
    db_config_1.default.query(`UPDATE subjects SET name = $1, code = $2 WHERE id = $3`, [name, code, id], (err, result) => {
        if (err) {
            console.log(err.message);
        }
        else {
            res.send('successfully updated');
        }
    });
}
exports.updateSubject = updateSubject;
function deleteSubject(req, res) {
    const id = parseInt(req.params.id);
    db_config_1.default.query(`DELETE FROM subjects WHERE id = $1`, [id], (err, result) => {
        if (err) {
            console.log(err.message);
        }
        else {
            res.send('successfully deleted');
        }
    });
}
exports.deleteSubject = deleteSubject;
///jjjj
//# sourceMappingURL=Functions.js.map