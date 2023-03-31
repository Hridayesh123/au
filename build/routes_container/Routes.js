"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const Functions_1 = require("../function_container/Functions");
const router = express.Router();
router.post('/login', Functions_1.login);
router.post('/verify', Functions_1.verifyToken);
router.get('/getAll', Functions_1.verifyToken, Functions_1.getSubject);
router.get('/:id', Functions_1.verifyToken, Functions_1.getSubjectsById);
router.post('/', Functions_1.verifyToken, Functions_1.createSubject);
router.put('/:id', Functions_1.verifyToken, Functions_1.updateSubject);
router.delete('/:id', Functions_1.verifyToken, Functions_1.deleteSubject);
exports.default = router;
//# sourceMappingURL=Routes.js.map