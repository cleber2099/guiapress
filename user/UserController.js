const express = require('express');
const router = express.Router();
const User = require("./User");

router.get("/admin/users",(req,res) =>{
    res.send("listagem de usres");
});

router.get("/admin/users/create",(req,res)=>{
res.render("admin/users/create");
});

router.post("/users/create",(req,res)=>{
    var email = req.body.email;
    var password = req.body.password;
    
    res.json({email, password});
   /* User.create({
        email: email,
        password: password
    }).then(()=>{
        res.redirect("/admin/users");
    });*/
});


module.exports = router;