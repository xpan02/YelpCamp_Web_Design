var express=require("express");
var router=express.Router();
var User= require("../models/user");
var passport=require("passport");
router.get("/",function(req,res){
    res.render("landing");
});


router.get("/register",function(req,res){
    res.render("register");
});

router.post("/register",function(req,res){
   //req.body.username
  // req.body.password
   User.register(new User({username:req.body.username}),req.body.password,function(err,user){
       if(err){
           req.flash("error",err.message);
           res.redirect("/register")
       }else{
           passport.authenticate("local")(req,res,function(){
               req.flash("success","Welcome to the YelpCamp "+user.username);
               res.redirect("/campground");
           })
       }
   })
});

router.get("/login",function(req,res){
    res.render("login");
});

router.post("/login",passport.authenticate("local",{
    successRedirect:"/campground",
    failureRedirect:"/login"
}),function(req,res){
   
})

router.get("/logout",function(req,res){
    req.logout();
    req.flash("success","logged you out");
    res.redirect("/");
     
})


module.exports=router;