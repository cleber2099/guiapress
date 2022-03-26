const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
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
    console("conectado ao bd");
}).catch((error)=>{
    console.log(error);
});
//rotas
app.get("/",(req,res)=>{
    res.render("index");
});

app.listen(8080,()=>{
    console.log("Servidor rodando na 8080")
})