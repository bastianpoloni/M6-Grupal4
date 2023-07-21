import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import yargs from "yargs";
import hbs from "hbs";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set("view engine", "hbs");
//app.use(express.static('public'));
app.use(express.static(__dirname + 'public'));
hbs.registerPartials(__dirname + "/views/partials");

app.get("/", (req, res) => {
    res.render("index");
})

app.listen(3000, () => {
    console.log("Servidor corriendo en el puerto 3000");
})