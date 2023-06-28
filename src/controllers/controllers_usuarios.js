import { Router } from "express";
import db from "../config/database.js";


const controllerUsuarios = Router();


controllerUsuarios.get("/usuarios", function (request, response) {
  let sql = "SELECT * FROM usuarios";
  db.query(sql, function (err, result) {
    if (err) {
      return response.status(500).send(err);
    } else {
      return response.status(200).json(result);
    }
  });
});

controllerUsuarios.get("/usuarios/:token", function (request, response) {
  let sql = "SELECT * FROM usuarios WHERE token_user = ?";
  db.query(sql, [request.params.token], function (err, result) {
    if (err) {
      return response.status(500).send(err);
    } else {
      if (result.length > 0) {
        return response.status(200).json(result[0]);
      } else {
        return response.status(404).json({ message: "Usuário não encontrado" });
      }
    }
  });
});


controllerUsuarios.post("/usuarios/login", function (request, response) {
  let sql = "SELECT user_id, nome ,token_user FROM usuarios WHERE email = ? and senha = ?";
  db.query(
    sql,
    [request.body.email, request.body.senha],
    function (err, result) {
      if (err) {
        return response.status(500).send(err);
      } else {
        return response.status(result.length > 0 ? 200 : 401).json(result[0]);
      }
    }
  );
});

import bcrypt from 'bcrypt';
const saltRounds = 10;

controllerUsuarios.post("/usuarios/cadastro", async function (request, response) {
  try {
    const currentDate = new Date();
    const salt = await bcrypt.genSalt(saltRounds);
    const token_user = (salt + currentDate).replace(/\//g, '');

    const sql = "INSERT INTO usuarios (nome, email, senha, token_user) VALUES (?, ?, ?, ?)";
    db.query(sql, [request.body.nome, request.body.email, request.body.senha, token_user], function (err, result) {
      if (err) {
        return response.status(500).send(err);
      } else {
        return response.status(201).json({ user_id: result.insertId });
      }
    });
  } catch (error) {
    return response.status(500).send(error);
  }
});




export default controllerUsuarios;
