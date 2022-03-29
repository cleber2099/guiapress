const Sequelize = require("sequelize");
const connection = require("../database/database");
const Category = require("../categories/Category");

const Article = connection.define('articles',{
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },slug:{
        type: Sequelize.STRING,
        allowNull: false
    },
    body:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Category.hasMany(Article);//Category possui muitos Article
Article.belongsTo(Category);//Article pertence a Categoria

//Article.sync({force: true});Força criar a tabela, remover depois de usar
module.exports = Article;