import { Router } from "express";
import db from "../config/database.js";

const controllerCategorias = Router();

controllerCategorias.get("/categorias", function(request, response) {
     let sql = "SELECT * FROM categorias";
     db.query(sql, function(err, result) {
       if (err) {
         return response.status(500).send(err);
       } else {
         return response.status(200).json(result);
       }
     });
   });
   controllerCategorias.get("/categorias/:id", function(request, response) {
     let sql = "SELECT * FROM categorias WHERE categoria_id = ?";
     db.query(sql, [request.params.id], function(err, result) {
       if (err) {
         return response.status(500).send(err);
       } else {
         if (result.length > 0) {
           return response.status(200).json(result[0]);
         } else {
           return response.status(404).json({ message: "Categoria não encontrada" });
         }
       }
     });
   });
   controllerCategorias.post("/categorias/cadastro", function (request, response) {
     let sql = "INSERT INTO categorias (nome) VALUES (?);";
     db.query(
       sql,
       [request.body.nome, request.body.email, request.body.senha],
       function (err, result) {
        if(err){
             return response.status(500).send(err)
        }else{
             return response.status(201).json({user_id: result.insertId});
        }
       }
     );
   });

   export default controllerCategorias;
