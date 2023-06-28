import { Router } from "express";
import db from "../config/database.js";

const controllerLista = Router();

//Detalhes das listas

controllerLista.get("/lista/:token_user", function (request, response) {
  const tokenUser = request.params.token_user;
  const sql ="SELECT lista_id,lis.nome FROM listas as lis INNER JOIN usuarios as usu ON lis.user_id = usu.user_id WHERE usu.token_user =?";

  db.query(sql, [tokenUser], function (err, result) {
    if (err) {
      console.error("Error executing SQL query:", err);
      return response
        .status(500)
        .json({ error: "An error occurred while retrieving the list." });
    }

    return response.status(200).json(result);
  });
});

controllerLista.get("/lista/itens/:id", function (request, response) {
  let sql =
    "SELECT pro.nome, ite.quantidade FROM listas AS lis INNER JOIN itenslista AS ite ON ite.lista_id = lis.lista_id LEFT JOIN produtos AS pro ON ite.produto_id = pro.produto_id WHERE lis.lista_id = ?";
  db.query(sql, [request.params.id], function (err, result) {
    if (err) {
      return response.status(500).send(err);
    } else {
      if (result.length > 0) {
        return response.status(200).json(result);
      } else {
        return response.status(404).json({ message: "Item não encontrado" });
      }
    }
  });
});

controllerLista.get("/listas/:lista_id", async function (request, response) {
    const lista_id = request.params.lista_id;
    const sql ="SELECT l.lista_id, l.nome FROM listas AS l INNER JOIN usuarios AS u ON l.user_id = u.user_id WHERE l.lista_id = ?;";
    db.query(sql, [lista_id], function (err, result) {
      if (err) {
        console.error("Error executing SQL query:", err);
        return response
          .status(500)
          .json({ error: "An error occurred while retrieving the list." });
      }
  
      return response.status(200).json(result);
    });
  });


controllerLista.get("/itenslista", function (request, response) {
  let sql = "SELECT * FROM itenslista";
  db.query(sql, function (err, result) {
    if (err) {
      return response.status(500).send(err);
    } else {
      return response.status(200).json(result);
    }
  });
});

controllerLista.post("/itenslista/cadastro", function (request, response) {
  let sql =
    "INSERT INTO itenslistas (lista_id,produto_id,quantidade) VALUES ( ?, ?, ?);";
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

export default controllerLista;
