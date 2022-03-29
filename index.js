const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const CategoriesController =  require("./categories/CategotirsController");
const ArticlesController = require("./articles/ArticlesController");

const Article = require("./articles/Article");
const Category = require("./categories/Category");

//view engine
app.set('view engine','ejs');
//static
app.use(express.static('public'));
//body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//database
connection
.authenticate()
.then(()=>{
    console.log("conectado ao bd");
}).catch((error)=>{
    console.log(error);
});
//Rotas
// Importando rotas de suas classes Controller
app.use("/",CategoriesController);
app.use("/",ArticlesController);
//------------X---------------

app.get("/",(req,res)=>{
    res.render("index");
});

app.listen(8080,()=>{
    console.log("Servidor rodando na 8080")
})