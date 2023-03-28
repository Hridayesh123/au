const express =  require('express');
const router = express.Router();
const client =  require('../config/db');
const {login,verifyToken, getSubject , getSubjectsById, createSubject, updateSubject, deleteSubject } = require('../function_container/subjectFunctions');
const jwt =  require('jsonwebtoken');
const key = 'key';

router.post('/login', login);

router.post('/profile', verifyToken, function (req, res) {
  jwt.verify(req.token, key, function (err, authData) {
    if (err) {
      res.send({
        result: 'token invalid',
      });
    } else {
      res.json({
        message: ' authorized',
        authData,
      });
    }
  });
});

router.get('/', getSubject);

router.get('/:id', getSubjectsById);

router.post('/', createSubject);

router.put('/:id', updateSubject);

router.delete('/:id', deleteSubject);

module.exports = router;