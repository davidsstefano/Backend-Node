import express from "express";
import cors from "cors";
import controllerUsuarios from "./src/controllers/controllers_usuarios.js";
import controllerProdutos from "./src/controllers/controllers_produtos.js";
import controllerCategorias from "./src/controllers/controllers_categorias.js";
import controllerLista from "./src/controllers/controllers_lista.js";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// Rest of your code


app.get("/", (req, res) =>{
  res.render("index");
});

app.use(express.json());
app.use(cors());

app.use(controllerUsuarios);
app.use(controllerProdutos);
app.use(controllerCategorias);
app.use(controllerLista);

app.listen(port, function() {
  console.log("Server on");
});