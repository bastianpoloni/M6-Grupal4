import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import yargs from "yargs";
import hbs from "hbs";
import Jimp from "jimp";
import bodyParser from "body-parser";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const argv = yargs(process.argv.slice(2)).argv;

app.set("view engine", "hbs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
hbs.registerPartials(__dirname + "/views/partials");

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", async (req, res) => {
  try {
    const image = await Jimp.read(req.body.inputUrl);
    const buffer = await image.getBufferAsync(Jimp.MIME_PNG);
    image
      .greyscale()
      .quality(60)
      .resize(350, Jimp.AUTO)
      .write("public/img/newImg.jpg");
      res.send(`<img src="/img/newImg.jpg">`);
  } catch (error) {
    console.log(error);
  }
  
});


//Ingresar nodemon app.js --key 123 para que servidor levante
if (argv.key == "123") {
  app.listen(3000, () => {
    console.log("Servidor corriendo en el puerto 3000");
  });
} else {
  console.log("Key incorrecta");
}
