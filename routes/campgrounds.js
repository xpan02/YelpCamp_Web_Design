var express=require("express");
var router=express.Router();
var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost/yelp_camp");
mongoose.Promise = global.Promise;
var bodyParser=require("body-parser");
var Campground= require("../models/campground");
var middlewareObj=require("../middleware");

router.get("/",function(req,res){
    Campground.find({},
        function(err,campground){
            if(err){
                console.log("oops, its an error")
            }else{
               res.render("campground/index",{campground:campground}); 
            }
        }
        
    )

});
router.post("/",middlewareObj.isLoggedIn,function(req,res){
    var name=req.body.name;
    var price=req.body.price;
    var image=req.body.picture;
    var des= req.body.des;
    var author={id:req.user.id,username:req.user.username}
    var newPost={name:name,price:price,image:image,des:des,author:author};
   // campground.push(newPost);
   Campground.create(newPost,function(err,post){
       if(err){
           console.log("error");
       }else{
           req.flash("success","campground saved");
            res.redirect("/campground");
       }
   })
   
    
});

router.get("/new",middlewareObj.isLoggedIn,function(req,res){
    res.render("campground/new");
});

router.get("/:id",function(req,res){
    var id =req.params.id;
    Campground.findById(id).populate("comments").exec(
       function(err,campground){
        if(err){
            console.log("error");
        }else{
           
             res.render("campground/show",{campground:campground});
        }
        
    })
   
});

 router.get("/:id/edit",middlewareObj.checkCampgroundOwnership,function(req,res){
    Campground.findById(req.params.id,function(err,campground){
            res.render("campground/edit",{campground:campground});
    })
 })
 
  router.put("/:id",middlewareObj.checkCampgroundOwnership,function(req,res){
      //req.body.campground.des = req.sanitizer(req.body.campground.des);
     Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,campground){
         if(err){
             res.redirect("/campground");
         }else{
             res.redirect("/campground/"+campground._id);
         }
     })
 })
 
 
  router.delete("/:id",middlewareObj.checkCampgroundOwnership,function(req,res){
     Campground.findByIdAndRemove(req.params.id,function(err,campground){
         if(err){
             res.redirect("/campground");
         }else{
             req.flash("success","campground deleted");
             res.redirect("/campground"); 
         }
     })
 })
 
 
module.exports=router;