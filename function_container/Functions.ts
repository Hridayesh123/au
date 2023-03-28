
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import DbClient from '../config/db_config';

const key = "key";

interface User {
  username: string;
  password: string;
}


function login(req: Request, res: Response): void {
  const user: User = {
    username: req.body.username,
    password: req.body.password,
  };
  const { username, password } = user;
  const sql = 'SELECT * FROM users WHERE firstname = $1 AND password = $2';

  const values = [user.username, user.password];

  DbClient.query(sql, values, (err, result) => {
    if (!err && result.rows.length!==0) {
      try {
        jwt.sign({ user }, key, (err, token) => {
          if (err) {
            console.log(err.message);
          } else {

            res.json({
              token,
            });
          }
        });
      }
      catch (err) {
        console.log(err.message);
      }
    }
    else {
     res.send("user not validated");
    }
  });
}

interface AuthenticatedRequest extends Request {
  token?: string;
}
function verifyToken(req: Request, res: Response, next: NextFunction): void {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const token = bearer[1];

    jwt.verify(token, key, (err, authData: any) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized' });
      } else {
        next();
        
      }
    });

  } else {
    res.send({
      result: 'invalid token',
    });
  }
}


function getSubject(req: Request, res: Response): void {
  DbClient.query('SELECT * FROM subjects', (err, result) => {
    if (err) {
      console.log(err.message);
      
    } else {
      res.send(result.rows);
    }
  });
}

function getSubjectsById(req: Request, res: Response): void {
  const id = parseInt(req.params.id);
  DbClient.query(`SELECT * FROM subjects WHERE id=${id}`, (err, result) => {
    if (err) {
      console.log(err.message);
      
    } else {
      res.send(result.rows);
    }
  });
}

function createSubject(req: Request, res: Response): void {
  const name = req.body.name;
  const code = req.body.code;
  DbClient.query(`INSERT INTO subjects(name, code) VALUES($1, $2)`, [name, code], (err, result) => {
    if (err) {
      console.log(err.message);
      
    } else {
      res.send('successfully inserted');
    }
  });
}

function updateSubject(req: Request, res: Response): void {
  const id = parseInt(req.params.id);
  const name = req.body.name;
  const code = req.body.code;
  DbClient.query(`UPDATE subjects SET name = $1, code = $2 WHERE id = $3`, [name, code, id], (err, result) => {
    if (err) {
      console.log(err.message);
      
    } else {
      res.send('successfully updated');
    }
  });
}

function deleteSubject(req: Request, res: Response): void {
  const id = parseInt(req.params.id);
  DbClient.query(`DELETE FROM subjects WHERE id = $1`, [id], (err, result) => {
    if (err) {
      console.log(err.message);
      
    } else {
      res.send('successfully deleted');
    }
  });
}


export { getSubject, getSubjectsById, createSubject, updateSubject, deleteSubject, login, verifyToken };
export { AuthenticatedRequest };
///jjjj
