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
// Importando rotasController
app.use("/",CategoriesController);
app.use("/",ArticlesController);
//------------X---------------

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