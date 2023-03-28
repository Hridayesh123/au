const client = require('../config/db');
const jwt = require('jsonwebtoken');
const key = 'key';

function getSubject(req, res){

  client.query('SELECT * FROM subjects', function(err, result){
    if (!err) {
        res.send(result.rows);
    }
    else{
        console.log(err.message);
    }
  });
 
}

function getSubjectsById(req,res){
    
    client.query(`SELECT * FROM subjects WHERE id=${req.params.id}`, function(err,result){
        if(!err){
            res.send(result.rows);
        }
        else{
            console.log(err.message);
        }
    });
 
}


function createSubject(req,res){
    
        client.query(`INSERT INTO subjects(name, code)
        VALUES('${req.body.name}','${req.body.code}')`, function(err,result){
            if(!err){
                res.send("successfully inserted");
            }
            else{
                console.log(err);
            }
        });
    
   
}

function updateSubject(req,res){
    
        client.query(`UPDATE subjects
        SET name = '${req.body.name}',
            code = '${req.body.code}'

        WHERE id = ${req.params.id}`, function(err, result){
            if(!err){
                res.send("successfully updated");
            }
            else{
                console.log(err.message);
            }
        });
    
              
}

function deleteSubject(req,res){
      
        client.query(`DELETE FROM subjects WHERE id=${req.params.id} `, (err, result)=>{
            if(!err){
                res.send('successfully deleted')
            }
            else{ console.log(err.message) }
        });
    
}

function login(req, res) {
    const user = {
      username: req.body.username,
      password: req.body.password,
    };
  
    jwt.sign({ user }, key, function (err, token) {
      res.json({
        token,
      });
    });
  }
  
  function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
      bearer = bearerHeader.split(' ');
      const token = bearer[1];
      req.token = token;
      next();
    } else {
      res.send({
        result: 'invalid token',
      });
    }
  }

module.exports = {
    getSubject,
    getSubjectsById,
    createSubject,
    updateSubject,
    deleteSubject,
    login,
    verifyToken
   
  };