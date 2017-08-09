var express=require("express");
var router=express.Router({mergeParams:true});
var Campground= require("../models/campground");
var Comment=require("../models/comment");
var middlewareObj=require("../middleware");

router.get("/new",middlewareObj.isLoggedIn,function(req,res){
     Campground.findById(req.params.id,function(err,campground){
         if(err){
             console.log(err);
         }else{
            res.render("comment/new",{campground:campground});
         }
     })
       
   
});


router.post("/",middlewareObj.isLoggedIn,function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
        }else{
            Comment.create(req.body.comment,function(err,comment){
                if(err){
                    console.log(err);
                }else{
                    comment.author.id=req.user._id;
                    comment.author.username=req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success","Comment saved");
                    res.redirect("/campground/"+req.params.id)
                }
            })
        }
    })
       
   
});

 router.get("/:comment_id/edit",middlewareObj.checkCommentOwnership,function(req,res){
    Comment.findById(req.params.comment_id,function(err,comment){
           if(err){
               console.log(err);
           }else{
               res.render("comment/edit",{comment:comment,campground_id:req.params.id});
           }
            
    })
 })
 
   router.put("/:comment_id",middlewareObj.checkCommentOwnership,function(req,res){
      //req.body.campground.des = req.sanitizer(req.body.campground.des);
     Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,comment){
         if(err){
             res.redirect("back");
         }else{
             res.redirect("/campground/"+req.params.id);
         }
     })
 })
 
   router.delete("/:comment_id",middlewareObj.checkCommentOwnership,function(req,res){
     Comment.findByIdAndRemove(req.params.comment_id,function(err,comment){
         if(err){
             res.redirect("back");
         }else{
             req.flash("success","Comment deleted");
             res.redirect("/campground/"+req.params.id); 
         }
     })
 })


 
module.exports=router;
