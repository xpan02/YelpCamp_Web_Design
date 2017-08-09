 var mongoose=require("mongoose");
 var Campground= require("./models/campground");
 var Comment=require("./models/comment");
//  var data=[
//      {
//          name:"cloud's Reset",
//          image:"http://www.photosforclass.com/download/15723001762",
//          des:"blah blah blah"
         
//      },
//      {
//          name:"Desert Mesa",
//          image:"http://www.photosforclass.com/download/27767657236",
//          des:"blah blah blah"
//      },
     
//      {
//          name:"Canyon Floor",
//          image:"http://www.photosforclass.com/download/33842877414",
//          des:"blah blah blah"
//      },
     
//  ]
 
 
 
 function seedDB(){
     Comment.remove({},function(err){
         if(err){
             console.log(err);
         }else{
           Campground.remove({},function(err){
         if(err){
             console.log(err);
         }else{
            console.log("campground has been removed");
            // data.forEach(function(seed){
            //     Campground.create(seed,function(err,campground){
            //         if(err){
            //             console.log(err);
            //         }else{
            //             console.log("campground created");
            //             Comment.create({
            //                 text:"This place is great,but i wish there was internet",
            //                 author:"Homer"
            //             },function(err,comment){
            //                 if(err){
            //                     console.log(err);
            //                 }else{
                                
            //                     campground.comments.push(comment);
            //                     campground.save();
            //                     console.log("Created new comment");
            //                 }
            //             })
                        
            //         }
            //     })
            // });
            
             
         }
     
         
     })
             
         }
             
         
     })
    
 }
 
 module.exports=seedDB;