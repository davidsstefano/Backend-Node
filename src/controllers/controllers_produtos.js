import { Router } from "express";
import db from "../config/database.js";


const controllerProdutos = Router();

controllerProdutos.get("/produtos", function(request, response) {
     let sql = "SELECT * FROM produtos  ";
     db.query(sql, function(err, result) {
       if (err) {
         return response.status(500).send(err);
       } else {
         return response.status(200).json(result);
       }
     });
   });

   controllerProdutos.get("/produtos/:id", function(request, response) {
     let sql = "SELECT * FROM produtos WHERE produto_id = ?";
     db.query(sql, [request.params.id], function(err, result) {
       if (err) {
         return response.status(500).send(err);
       } else {
         if (result.length > 0) {
           return response.status(200).json(result[0]);
         } else {
           return response.status(404).json({ message: "Produto não encontrado" });
         }
       }
     });
   });
   
export default controllerProdutos;