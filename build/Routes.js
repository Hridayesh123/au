"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var Functions_1 = require("../function_container/Functions");
var jsonwebtoken_1 = require("jsonwebtoken");
var router = express.Router();
var key = "key";
router.post('/login', Functions_1.login);
router.post('/profile', Functions_1.verifyToken, function (req, res) {
    jsonwebtoken_1.default.verify(req.token, key, function (err, authData) {
        if (err) {
            res.send({
                result: 'token invalid',
            });
        }
        else {
            res.json({
                message: ' authorized',
                authData: authData,
            });
        }
    });
});
router.get('/', Functions_1.getSubject);
router.get('/:id', Functions_1.getSubjectsById);
router.post('/', Functions_1.createSubject);
router.put('/:id', Functions_1.updateSubject);
router.delete('/:id', Functions_1.deleteSubject);
exports.default = router;
