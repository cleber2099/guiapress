const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const CategoriesController =  require("./categories/CategotirsController");
const ArticlesController = require("./articles/ArticlesController");
const UserController = require("./user/UserController");
const Article = require("./articles/Article");
const Category = require("./categories/Category");
const User = require("./user/User");
const session = require("express-session");

//view engine
app.set('view engine','ejs');
//sessions
//redis
app.use(session({
    secret: "qualquercoisa",
    cookie: {
        maxAge: 250000000
    }
}));

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
// Importando rotasController
app.use("/",CategoriesController);
app.use("/",ArticlesController);
app.use("/",UserController);
//------------X---------------

app.get("/session",(req,res)=>{
    req.session.treinamento = "NodeJS";
    req.session.ano = 2020;
    req.session.email = "cleber@email.com";
    req.session.user = {
        name: "Cleber",
        email: "cleber@email.com",
        id: 10
    };
    res.send("ok");
});
app.get("/leitura",(req,res)=>{
    res.json({
        treinamento: req.session.treinamento,
        ano: req.session.ano,
        email: req.session.email,
        user: req.session.user
    })
});

app.get("/",(req,res)=>{
    Article.findAll({
        order:[[ 'id','DESC']],
        limit: 3
    }).then(articles =>{
    Category.findAll().then(categories =>{ 
        res.render("index",{articles:articles,categories:categories}); 
    });
    });
});
app.get("/:slug",(req,res)=>{
    Article.findOne({
        where:{
            slug: req.params.slug
        }
    }).then(article =>{
        if(article != undefined){
            Category.findAll().then(categories =>{ 
                res.render("article",{article:article,categories:categories}); 
            });
        }else{
            res.redirect("/");
        }
    }).catch(error =>{
        res.redirect("/")
    });
    
})
app.get("/category/:slug",(req,res)=>{
 var slug = req.params.slug;
    Category.findOne({
        where:{
            slug: slug
        },
        include:[{model: Article}]
    }).then(category =>{
        if(category != undefined){
            Category.findAll().then(categories =>{
                res.render("index",{articles:category.articles,categories:categories});
            });
        }else{
            res.redirect("/");
        }
    }).catch(error =>{
        res.redirect("/");
    });
});

app.listen(8080,()=>{
    console.log("Servidor rodando na 8080")
})